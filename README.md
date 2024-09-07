


![Banner(1)](https://github.com/user-attachments/assets/772bca93-63d5-44c3-a1ee-31e8bf3ea636)


# Hada - Korean Flashcard Learning App!

View Releases Here **(All you need is your phone)**:  https://github.com/Project-Hada/Hada-App-Client/releases 

# Demo

https://github.com/user-attachments/assets/4fa2e885-5ecc-4fb2-93de-3f9f7f3d0ca6

**Figma Link:** https://www.figma.com/design/aQeNaf3BR2pi1mg6sQ86yb/HADA?node-id=0-1&t=zwnLo8qlf3gSWKtX-1

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

To effectively contribute to Hada, it's important to familiarize yourself with the project's structure and some key terms used within the app.

### Key Terms

- **Playlist/Deck**: A collection of words that the user will study.
- **Library**: Contains the list of playlists or decks.
- **DeckPreview/Playlist Preview**: Refers to viewing the cards within a playlist or deck, but not actively studying them.
- **Flashcard/Study Flow**: The act of studying the flashcards.
- **Spaced Repetition**: A learning technique that involves increasing the intervals of time between reviewing the learned material to enhance long-term memorization. The spaced repetition system used in this project is based on an algorithm designed for efficiency in learning. More about the algorithm can be found here: [FSRS for Anki](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm).

### Project Structure

The application's flow is structured as follows (as of date):

`App.tsx > Configure.tsx > Router > Library.tsx > DeckPreview.tsx > Practice.tsx`

- **`App.tsx`**: The entry point of the application. (**DO NOT** use hooks `App.tsx` they will not mount, use `Configure.tsx` instead)
- **`Configure.tsx`**: Configures the application, preparing contexts and setting up top-level logic.
- **`Router`**: Manages navigation within the app, leading to different pages the user can access.
- **`Library.tsx`**: Houses the user's library, allowing access to individual decks or playlists.
- **`DeckPreview.tsx`**: Allows users to preview the cards within a deck before starting the study flow.
- **`Practice.tsx`**: The page where the actual study session happens, implementing the spaced repetition technique.

Additional project files and directories:
- **`utils/`**: Holds utility functions and contexts.
- **`utils/types.ts`**: Contains the type definitions used across the project.
- **`components/pages/`**: Contains the pages/components used within the app's navigation flow.

to update build: `eas update`

# License Agreement

**HADA Software License Agreement**

This License Agreement ("Agreement") is made between HADA ("Company") and you, the user ("Licensee").

## Grant of License

The Company grants the Licensee a non-exclusive, non-transferable, limited right to access and use the HADA software ("Software") in accordance with the terms of this Agreement.

## Restrictions

The Licensee shall not modify, distribute, sublicense, or use the Software except as expressly permitted by this Agreement. The Licensee agrees not to use the Software in any manner that could damage, disable, overburden, or impair the Software or interfere with any other party's use.

## Intellectual Property

The Software and its original content, features, and functionality are and will remain the exclusive property of the Company and its licensors. The Software is protected by copyright, trademark, and other laws of both the United States and foreign countries.

## Termination

The Company may terminate this license at any time for any reason. Upon termination, the Licensee must cease all use of the Software and delete all copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

# Terms of Use

**Welcome to HADA**

## Acceptance of Terms

By accessing or using the HADA software, you agree to be bound by these Terms of Use ("Terms").

## Use License

You are granted a limited license to access and use the Software for personal, non-commercial purposes as set forth in the License Agreement.

## User Conduct

You agree not to use the Software in a way that:
- Compromises the security of the Software.
- Attempts to gain unauthorized access to any portion or feature of the Software, or any other systems or networks connected to the Software.
- Exploits, distributes or publicly communicates any error, bug or glitch in the Software.

## Termination

We may terminate or suspend access to our Software immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.

---

# Privacy Policy

**Last updated: 3/20/2024**

At HADA, we are committed to protecting your privacy. This Privacy Policy applies to the HADA software and governs our data collection, processing, and usage practices.

## Information Collection and Use

We collect information that you provide to us, including but not limited to your email address and any flashcards you create. This information is used to operate the Software and provide its services.

## Security

We are committed to ensuring that your information is secure. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure.

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## Contact Us

If you have any questions about this Privacy Policy, please contact us.

---

