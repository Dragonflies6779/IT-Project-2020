![alt text](https://github.com/Dragonflies6779/IT-Project-2020/blob/master/logo.png)

# My Portfolio System Website
Link : my-portfolio-system.web.app

# An E-Portfolio System
My Portfolio System was developed by Adeline, Angela, Anthony, Steven and Edison for [COMP30022](https://handbook.unimelb.edu.au/2019/subjects/comp30022) at the University of Melbourne. It was created following the agile development and mainly supports web browsers.

A portfolio system that allows multiple users to upload and edit their portfolios <br />
Allows others to also view the others portfolios

# Table of Contents

<!--ts-->
   * [Introduction](#My-Portfolio-System-Website)
   * [Table of contents](#table-of-contents)
   * [Core Functions](#Core-Functions)
      * [Features](#Features)
   * [Quick Demo](#Quick-Demo)
      * [Gif](#Quick-Demo)
      * [Screenshots](#screenshots-of-main-features)
   * [Key Classes](#Key-classes)
      1. [Page](#page)
      2. [profileInformation](#profileInformation)
      3. [Session](#Session)
      4. [Updateprofile](#updateProfile)
      5. [Upload](#Upload)
      6. [User](#User)
      7. [Config](#Config)
   * [Database Structure](#database-structure)
   * [Languages](#Language)
   * [System Requirements](#System-Requirements)
   * [Deployment Guidlines](#Deployment-Guidlines)
   * [Testing](#tesing)
   * [Authors](#Authors)
   * [Changelog](/CHANGELOG.md)
<!--te-->

# Core Functions
Can search for others portfolio <br />
Allows outside viewers to view others portfolios <br />
Can sign up and login - requires first name, last name, email and password <br />
Allows the adding and editing of text <br />
Allows the uploading of images <br />
Allows the uploading and download of a resume (pdf format) <br />
Can attach social media handles

### Features
[Features as User Stories](/docs/User_Stories.pdf)

# Quick Demo

![alt text](/readme_images/demo_gif.gif)

### Screenshots of main features

![alt text](/readme_images/eportfolio-page.jpg)

Currently hosted on: https://my-portfolio-system.web.app/ <br />

# Key Classes

The web application is split into different components into different folders
Below are the folders and the description for each file:

<!--ts-->
  1. [Page](#page)
  2. [profileInformation](#profileInformation)
  3. [Session](#Session)
  4. [Updateprofile](#updateProfile)
  5. [Upload](#Upload)
  6. [User](#User)
  7. [Config](#Config)
<!--te-->

### Page
This contains the components for the page:
* The search bar frontend - search.js
* The search bar function - searchfunc.js
* The search results - results.js
* Account information - account.js
* The Homepage - home.js
* General layout - layout.js

### profileInformation
This contains the components for each profile:
* The component that allows for editing, adding and storing the education data - education.js
* The component that allows for editing, adding and storing the experience data - experience.js
* The component that allows for editing, adding and storing the interest data - interest.js 
* The component that allows for editing, adding and storing the profile picture data - profilepict.js
* The component that allows for editing, adding and storing the project data - project.js
* The component that allows for editing, adding and storing the skills data - skills.js
* The component that allows for editing, adding and storing the summary data - summary.js
All these components are used within the profile.js file to create the overall profile page

### Session
This contains the components for account system
* Login page - login.js
* Signout function - signout.js

### Updateprofile
This contains the components for updating the general profile:
* Editing Account Details - accountDetails.js
* Changing password - changePassword.js
* Changing the social media - socialMedia.js
These components are used in the profile.js file

### Upload
There are 2 folders here 1 for image upload (upload) and the other for pdf uploading (uploadFile)
* Uploading images - imagesUpload
* Uploading pdf - pdfUpload

### User
This contains the signup page
* Signup Page - signup.js

### Config
This contains the general routing and authentication of the website
* Routing - route.js
* A function that checks if authentication is required - require_auth.js

# Database Structure
![alt text](/readme_images/database_structure.png) <br />
The Realtime Database and the Storage has a one to one relationship with the User and have the foreign key of the userID. Users in the realtime database describe the extra account details that are not stored in the user database.

# Language
Javascript <br />
HTML

# System Requirements
@testing-library/jest-dom: 5.11.4  
@testing-library/react: 11.0.4    
babel-cli: 6.26.0  
babel-core: 6.26.3  
boostrap: 2.0.0  
firebase: 3.4.0  
react: 15.3.1  
react-bootstrap: 1.3.0  
react-dom: 15.3.1  
react-mailto: 0.4.0  
react-router: 2.8.1  
react-router-dom: 5.2.0  


# Deployment Guidlines
https://firebase.google.com/docs/hosting/quickstart <br />

#### To deploy to your site <br />

[Sign into firebase](https://console.firebase.google.com/) <br />
Create a firebase project <br />
[Register the app with firebase](https://firebase.google.com/docs/web/setup) - for further information follow the link <br />
[Add storage capabilities to the app](https://firebase.google.com/docs/storage/android/start) <br />
[Install the Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) <br />
Run the following command from the root of your local project directory: <br />
firebase deploy --only hosting <br />

# Testing
On the console run - "npm run test"

# Authors
Adeline Wijaya <br />
Angela Nubary <br />
Anthony Yuen <br />
Chai Zhuo Lin (Edison) <br />
Steven Alvin

# Changelog
[Changelog](/CHANGELOG.md) <br />
