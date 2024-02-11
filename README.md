# Mindful Mobile Application

## Description
The Mindful mobile application aims to spread mental health awareness by providing users with a platform to book therapy sessions, interact with therapists, journal their thoughts, and access psychology tests.

## Features
- **Authentication and Registration:**
    - Users can sign up using email, phone number, or social media accounts.
    - Basic information like language preference and country is collected during registration.
- **Psychology Tests:**
    - Access a variety of psychology tests.
    - Track and store test results over time.
- **Journaling:**
    - Users can journal via voice or text.
    - Machine Learning model analyzes journal entries for mood overview.
- **Therapist Interaction:**
    - View a list of therapists, their availability, session duration, and price.
    - Book appointments for chat, voice call, or video call.
    - Secure payments through Stripe.
- **Sharing Reports:**
    - Choose whether to share reports with therapists.
    - Reports are transformed into weekly, monthly, or yearly summaries.
- **Appointment Management:**
    - Cancel appointments.
    - Join therapy sessions.
- **Notifications:**
    - Receive notifications for app activities.
- **Feedback:**
    - Rate therapists.
- **Admin Panel:**
    - Comprehensive control over the entire system.
    - Review and approve therapist accounts.
    - Incident management.
- **Customer Support:**
    - Dashboard access for support representatives.
    - Assistance for both patients and therapists.

## Project Structure
```
mindful/
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── yarn.lock
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
└── src/
    ├── app.controller.spec.ts
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── main.ts
    ├── prisma.service.ts
    ├── firebase/
    │   ├── firebase-app.module.ts
    │   ├── firebase-app.provider.ts
    │   └── firebase-app.repository.ts
    ├── entities/
    │   ├── login.user.entity.ts
    │   ├── register.user.entity.ts
    │   └── humans/
    │       ├── humans.module.ts
    │       ├── therapist.service.ts
    │       └── user.service.ts
    ├── database/
    │   └── prisma/
    │       ├── schema.prisma
    │       └── migrations/
    └── auth/
        ├── auth.controller.ts
        ├── auth.module.ts
        ├── auth.service.ts
        └── strategy/
            └── jwt.startegy.ts
```

## Technologies Used
- Frontend: Flutter
- Backend: NestJS
- Database: PostgreSQL (Prisma ORM)
- Authentication: Firebase
- Notifications: Firebase

## Getting Started
1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Set up environment variables in `.env` file.
4. Start the backend server using `yarn start:dev`.
5. Start the Flutter app.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/fooBar`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some fooBar'`).
5. Push to the branch (`git push origin feature/fooBar`).
6. Create a new Pull Request.

## Authors
- [Saif Ad-Din Samir Shenawi](https://github.com/ZodicSlanser)

[//]: # (## License)

[//]: # (This project is licensed under the MIT License - see the [LICENSE]&#40;LICENSE&#41; file for details.)

[//]: # ()
[//]: # (---)

