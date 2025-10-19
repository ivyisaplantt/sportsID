"""
Performance monitoring and optimization utilities
Supports 100 concurrent users and 95% uptime requirements
"""

import time
import threading
from functools import wraps
from flask import request, g
import logging
from datetime import datetime, timedelta
import psutil
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PerformanceMonitor:
    """Monitor application performance and resource usage"""
    
    def __init__(self):
        self.request_times = []
        self.error_count = 0
        self.total_requests = 0
        self.start_time = datetime.utcnow()
        self.max_concurrent_users = 100
        self.target_uptime = 0.95
        
    def record_request_time(self, duration):
        """Record request processing time"""
        self.request_times.append(duration)
        self.total_requests += 1
        
        # Keep only last 1000 requests for memory efficiency
        if len(self.request_times) > 1000:
            self.request_times = self.request_times[-1000:]
    
    def record_error(self):
        """Record an error occurrence"""
        self.error_count += 1
    
    def get_average_response_time(self):
        """Get average response time"""
        if not self.request_times:
            return 0
        return sum(self.request_times) / len(self.request_times)
    
    def get_error_rate(self):
        """Get current error rate"""
        if self.total_requests == 0:
            return 0
        return self.error_count / self.total_requests
    
    def get_uptime(self):
        """Calculate current uptime percentage"""
        uptime_seconds = (datetime.utcnow() - self.start_time).total_seconds()
        # Assuming 24/7 operation, calculate uptime
        # In production, this would track actual downtime
        return 1.0  # Placeholder - implement actual uptime tracking
    
    def get_system_metrics(self):
        """Get current system resource usage"""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            return {
                'cpu_percent': cpu_percent,
                'memory_percent': memory.percent,
                'memory_available_gb': memory.available / (1024**3),
                'disk_percent': disk.percent,
                'disk_free_gb': disk.free / (1024**3),
                'database_type': 'PostgreSQL'
            }
        except Exception as e:
            logger.error(f"Error getting system metrics: {e}")
            return {}
    
    def check_performance_thresholds(self):
        """Check if performance is within acceptable thresholds"""
        avg_response_time = self.get_average_response_time()
        error_rate = self.get_error_rate()
        uptime = self.get_uptime()
        system_metrics = self.get_system_metrics()
        
        issues = []
        
        # Response time threshold (should be under 2 seconds)
        if avg_response_time > 2.0:
            issues.append(f"High response time: {avg_response_time:.2f}s")
        
        # Error rate threshold (should be under 5%)
        if error_rate > 0.05:
            issues.append(f"High error rate: {error_rate:.2%}")
        
        # Uptime threshold (should be above 95%)
        if uptime < self.target_uptime:
            issues.append(f"Low uptime: {uptime:.2%}")
        
        # System resource thresholds
        if system_metrics.get('cpu_percent', 0) > 80:
            issues.append(f"High CPU usage: {system_metrics['cpu_percent']:.1f}%")
        
        if system_metrics.get('memory_percent', 0) > 85:
            issues.append(f"High memory usage: {system_metrics['memory_percent']:.1f}%")
        
        return {
            'healthy': len(issues) == 0,
            'issues': issues,
            'metrics': {
                'avg_response_time': avg_response_time,
                'error_rate': error_rate,
                'uptime': uptime,
                'total_requests': self.total_requests,
                'system': system_metrics
            }
        }

# Global performance monitor instance
performance_monitor = PerformanceMonitor()

def monitor_performance(f):
    """Decorator to monitor function performance"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        start_time = time.time()
        
        try:
            result = f(*args, **kwargs)
            return result
        except Exception as e:
            performance_monitor.record_error()
            raise e
        finally:
            duration = time.time() - start_time
            performance_monitor.record_request_time(duration)
    
    return decorated_function

class ConnectionPool:
    """Simple connection pool for database optimization"""
    
    def __init__(self, max_connections=20):
        self.max_connections = max_connections
        self.connections = []
        self.lock = threading.Lock()
    
    def get_connection(self):
        """Get a connection from the pool"""
        with self.lock:
            if self.connections:
                return self.connections.pop()
            return None
    
    def return_connection(self, connection):
        """Return a connection to the pool"""
        with self.lock:
            if len(self.connections) < self.max_connections:
                self.connections.append(connection)

class CacheManager:
    """Simple in-memory cache for frequently accessed data"""
    
    def __init__(self, max_size=1000, ttl=300):  # 5 minutes TTL
        self.cache = {}
        self.max_size = max_size
        self.ttl = ttl
        self.lock = threading.Lock()
    
    def get(self, key):
        """Get value from cache"""
        with self.lock:
            if key in self.cache:
                value, timestamp = self.cache[key]
                if time.time() - timestamp < self.ttl:
                    return value
                else:
                    del self.cache[key]
            return None
    
    def set(self, key, value):
        """Set value in cache"""
        with self.lock:
            if len(self.cache) >= self.max_size:
                # Remove oldest entry
                oldest_key = min(self.cache.keys(), key=lambda k: self.cache[k][1])
                del self.cache[oldest_key]
            
            self.cache[key] = (value, time.time())
    
    def clear(self):
        """Clear all cache entries"""
        with self.lock:
            self.cache.clear()

# Global cache instance
cache_manager = CacheManager()

def cache_result(ttl=300):
    """Decorator to cache function results"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Create cache key from function name and arguments
            cache_key = f"{f.__name__}:{hash(str(args) + str(kwargs))}"
            
            # Try to get from cache
            cached_result = cache_manager.get(cache_key)
            if cached_result is not None:
                return cached_result
            
            # Execute function and cache result
            result = f(*args, **kwargs)
            cache_manager.set(cache_key, result)
            return result
        
        return decorated_function
    return decorator

class RateLimiter:
    """Simple rate limiter to prevent abuse"""
    
    def __init__(self, max_requests=100, time_window=60):  # 100 requests per minute
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = {}
        self.lock = threading.Lock()
    
    def is_allowed(self, client_ip):
        """Check if request is allowed for client IP"""
        now = time.time()
        
        with self.lock:
            if client_ip not in self.requests:
                self.requests[client_ip] = []
            
            # Remove old requests outside time window
            self.requests[client_ip] = [
                req_time for req_time in self.requests[client_ip]
                if now - req_time < self.time_window
            ]
            
            # Check if under limit
            if len(self.requests[client_ip]) < self.max_requests:
                self.requests[client_ip].append(now)
                return True
            else:
                return False

# Global rate limiter
rate_limiter = RateLimiter()

def rate_limit(f):
    """Decorator to apply rate limiting"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = request.remote_addr
        
        if not rate_limiter.is_allowed(client_ip):
            return {
                'error': 'Rate limit exceeded',
                'retry_after': 60
            }, 429
        
        return f(*args, **kwargs)
    
    return decorated_function

def get_performance_report():
    """Get comprehensive performance report"""
    return performance_monitor.check_performance_thresholds()
