<div align="center">

# JODDKeep

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-joddkeep">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
      <li><a href="#landing-page">Landing Page</a></li>
        <li><a href="#notes-page">Notes Page</a></li>
        <li><a href="#label-page">Label Page</a></li>
        <li><a href="#archive-page">Archive Page</a></li>
        <li><a href="#trash-page">Trash Page</a></li>
        <li><a href="#authentication">Authentication</a></li>
      </ul>
    </li>
  </ol>
</details>

---

## About JoddKeep

JODDKeep is a note keeping app to keep track of your things to be done. JODDKeep is publicly hosted on vercel at [https://joddkeep-sainath7878.vercel.app/](hhttps://joddkeep-sainath7878.vercel.app/)

The website is built using following tech-stack:

<ul>
    <li>ReactJS</li>
    <li>React Router v6</li>
    <li>useContext + useReducer for state management</li>
    <li>Jodd UI and Vanilla CSS</li>
    <li>MockBee for mock Backend</li>
</ul>

---

## Getting Started

---

### Installation

Clone the repository on your local machine by typing the below commands on your terminal and cd to `joddkeep`.

```
git clone https://github.com/sainath7878/joddkeep.git
cd joddkeep
```

Install the necessary dependencies.

```
npm install
```

`joddkeep` uses `mockbee's` mockbackend.
Create an environment variable inside .env file in the root of the project with the below code.

```
REACT_APP_JWT_SECRET = <JWT_SECRET_KEY_OF_YOUR_CHOICE>
```

Now to run the app write the following command in your terminal:

`npm start`
This should run the app on localhost:3000.

```
npm start
```

---

## Features

---

### Landing Page

- User can navigate to SignUp or Login if already an existing user

### Notes Page
- User can view already added note categorised as Pinned and Others.
- User Can add a new note. 
- User can edit an existing note.
- User can add a note to trash
- User can archive a note.
### Label Page

- User can filter out notes using different filters like
  - filter by Label
  - Sort by Date
  - Sort by Priority

### Archive Page
- User can unarchive a note from archive
- User can move a note to trash

### Cart Page
- User restore a note from trash
- User can delete a note from trash.
### Authentication

- User can do a guest login
- User can Log In/Log Out with existing credentials
- User can sign up by if they are new to website
- User can logout from navbar

## SOCIALS

---

<a href="https://twitter.com/sainath_svm"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>
<a href="https://www.linkedin.com/in/svm-sainath-90aa061aa/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>

</ul>
