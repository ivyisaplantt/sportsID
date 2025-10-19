# Unified Sports Registration System (USRS)

USRS is a full-stack web platform that simplifies family sports registration by consolidating multiple sports organizations into one unified portal. Families can register, manage, and track their sports programs seamlessly from a single dashboard.
MVP for the RegisterX SportsID Intern Project Fall 2025

---

## 🚀 Overview

**Problem:**  
Parents often juggle multiple platforms to register their children for sports, each with different forms, fees, and systems.

**Solution:**  
USRS provides a unified, streamlined registration process. Parents create a family account, add children, browse programs across organizations, complete one universal registration form, and manage everything from a single dashboard.

---

## Core Features

### Family Flow
1. Landing → Arrive at USRS homepage  
2. Account Creation → Parent creates family account  
3. Profile Setup → Add children  
4. Browse Sports → View available programs across organizations  
5. Select Programs → Choose multiple programs  
6. Complete Forms → Fill one unified registration form  
7. Review → Check selected programs  
8. Confirmation → Receive confirmation + dashboard access  
9. Management → Track and modify registrations from dashboard  

### Organization Flow
1. Partner Onboarding → Organization registers with USRS  
2. Integration Setup → Configure API/data sync  
3. Program Upload → Add sports programs  
4. Receive Registrations → Access participant data  
5. Analytics Dashboard → Monitor engagement and metrics  

---

## Architecture
...

---

## Setup Instructions

In order to run the application, ensure the repository is cloned. 
```bash
git clone git@github.com:ivyisaplantt/sportsID.git
cd sportsID
```

To run the backend server: 
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```
To run the frontend server: 
```bash
cd frontend
npm install
npm run dev
```