# Hada - Korean Flashcard Learning App

## Introduction

Hada is a Korean flashcard learning app that leverages the power of spaced repetition to optimize the learning process. Spaced repetition is a learning technique where review intervals for each flashcard are systematically increased to embed knowledge more deeply. Unlike other platforms, Hada is designed to streamline your learning experience, making it simpler, more efficient, and tailored to your needs.

### The Problem with Other Apps
- **[Duolingo](https://www.duolingo.com/)**: Fun but lacks sufficient input, minimal vocabulary acquisition.
- **[Quizlet](https://quizlet.com/)**: Complex user flow, lacks spaced repetition, underutilizing flashcard potential.
- **[Anki](https://apps.ankiweb.net/)**: Offers spaced repetition, suffers from an open-source, less intuitive UI, complex flashcard sharing.
- **[Drops](https://languagedrops.com/)**: Limits user control with preset study lists and a complicated user flow.

### Hada's Solution
Hada focuses on simplicity and efficiency. Our approach is to:
- Maximize exposure to new words and sets created by others.
- Enhance learning through listening with auto-play features.
- Implement an effective study algorithm for spaced repetition.
- Offer a seamless, stress-free flashcard study experience with minimal effort required from the user.

## Team

| Name             | Role                   | Contact Info |
| ---------------- | ---------------------- | ------------ |
| Christian Rudder | Product Owner, Software Engineer | crubber@bu.edu |
| Emma Kim         | Scrum Master, UX/UI Lead | emmak1m@bu.edu|
| Junyi Huang      | Software Engineer      | jyiyi@bu.edu |
| Sangyun Kim      | Software Engineer      |sykim25@bu.edu |
| Wilson Zhang     | Software Engineer      | wilson23@bu.edu |
| **Instructors**  |                        | |
| Ziba Cranmer     | Spark Director         | zcranmer@bu.edu|
| James Grady      | Spark UI/UX Lead       |jjgrady@bu.edu |
| Asad Malik       | Spark Technical Lead   | am5815@bu.edu|
| **TA**           |                        | |
| Daniel OH        | Assigned TA            |danoh@bu.edu |
| Woo Zhong Han    |                        | wzhan@bu.edu     |
| Molly Zhou       |                        | jyanzhou@bu.edu |
| **Mentors**      |                        | |
| Asumi Hasan      | UI/UX                  | ahasan@redhat.com|
| Daniel Wong      | Technical              |wongdanr@gmail.com |
| Srishti Belwariar| Technical              | srishtibelwariar@gmail.com |
| Xi Zhao          | Technical              | xi.zhao@spinnakeranalytics.com|

*Class XC475, Boston University*

## Tech Stack

Hada is built using React Native with Expo for mobile app development and Firebase for backend services.

<p align="center">
  <img src="https://github.com/Project-Hada/Hada-App-Client/assets/74576449/808debec-2154-487d-b556-68f1eda00612" alt="React Native Logo" height="250" style="margin-right: 100px;">
  <img src="https://github.com/Project-Hada/Hada-App-Client/assets/74576449/a4a1e327-0606-4e47-a368-01cc29e9c97d" alt="Expo Logo" height="250" style="margin-right: 100px;">
  <img src="https://github.com/Project-Hada/Hada-App-Client/assets/74576449/936f998b-7090-498f-bf9a-70c87cc47a80" alt="Firebase Logo" height="250">
</p>

## Getting Started

## Getting Started

This section provides a step-by-step guide to get your development environment set up and run the Hada app on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js: Required to run the JavaScript code. Download and install it from the (Node.js website)[https://nodejs.org/en].
- Git: (git)[https://git-scm.com/downloads] is installed on your machine
- Yarn: Used for managing the app's packages. After installing Node.js, install Yarn by running

  `npm install -g yarn in your terminal`
- Expo CLI: Necessary for running the app. Install it globally using Yarn with

  `yarn global add expo-cli`

### Installation

1. Clone the repository to your local machine:
   `git clone https://github.com/your/hada-app-client.git`

2. Navigate to the project directory:
   `cd hada-app-client`

3. Install dependencies with Yarn:
   `yarn install`

### Running the App
**To start you may simply run**: `yarn start` <--
  
  Then you may scan the QR code above with Expo Go (Android) or the Camera app (iOS)

  - **Running on Android or iOS Emulator**:
    - For Android, ensure you have an Android emulator running, or a device connected, and run:

      `yarn android`

    - For iOS, ensure you have Xcode installed and an iOS simulator set up, then run:
   
      `yarn ios`

  - **Running on the Web**:

  `yarn web`
  This command will open up a web version of the app in your default browser.

## Contributing



## License

(Information about the project's license. This section is optional but recommended.)

