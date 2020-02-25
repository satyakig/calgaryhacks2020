# StudyBudy

## Calgary Hacks 2020 - University of Calgary

## First Place (1st) Winner

## [Dev Post](https://devpost.com/software/studybudy)

### Team

- James Peralta
- Satyaki Ghosh
- Albert Choi
- Nathaniel Habtegergesa
- Mohit Parmar

### Inspiration

As students, we face the challenge of finding a way to fit as many assignments, midterms, and finals in as short of a time as possible. And sometimes it is hard to even come up with a plan to start studying. That is where we came up with the idea of StudyBudy, a tool that consolidates all the services mentioned and provides deep insights into their semester. This companion will let all students improve their time management, awareness, and facilitate communication with classmates. This all in one platform will create a one-stop web app for all your scheduling needs.

### What it does

These are the main components that we have developed to promote positivity and time management.

#### DASHBOARD

On the dashboard, after students enrol in courses, an automatic graphical view is generated of the total course workload throughout the semester giving students insight on how busy certain weeks will be. Because the course load is so uneven, we designed a custom algorithm that distributes the workload evenly across the semester to optimize studying patterns and habits, so students aren’t feeling overwhelmed from more intense weeks. As you can see, the first few weeks are often not busy, which is a time students can use to lessen workload from later in the semester.

#### COURSES

This section provides a list of courses the student can enrol in, and gives them the ability to add them, which updates the database in real-time and provides the insight in our other sections. The data from these courses was scraped from course outlines which provides all of this information.

#### CALENDAR

In the Calendar view, students have all of their assignments and tests populated automatically depending on the course they are in. Also, the study tasks generated from the algorithm are included. This algorithm provides a weighted average from the course weight of a given assignment/exam, and the time to complete it based on input from professors.

#### CHAT BOT

To make this platform more useful, we have implemented a chatbot which uses ML to detect user queries and answers their questions. Here are some examples: “What is my busiest week?” “I feel stressed?” “Course description for CPSC 457” Since this chatbot is still learning, it can only handle certain requests for now.

#### COMMUNICATION

We have also implemented a real-time chat room that students can use to collaborate with other students, professors, and TAs. Finding friends in classes has been found to help you learn and understand the material better and may also help decrease your stress in class.

### How we built it

We leveraged the many tools that Google Cloud provides on its platform to ensure that the deployed application was always production-ready. We utilized build pipelines, auto-scaling instances, and federated identity providers to ensure the security and stability of our applications at all times. We utilized federated identity providers to provide users to login using their preferred method including Google, Email, and Mobile Phone (SMS).

The frontend was developed in React to ensure that we had a responsive application both on desktop and mobile. We decided that it was important to support both platforms as many people are moving to mobile as their primary interface when accessing the internet and we wanted to ensure that everyone had access to this critical time management tool.

The backend was a REST API developed in Node.js utilizing express.js for routing. We ensured that the front end team had access to the critical endpoints ensuring that students were able to access the data they needed to when they needed to.

### Challenges we ran into

The biggest challenge we ran into is the scope growing too large from our original vision. But even as the scope grew larger the strong teamwork and the technical ability of the team was able to tackle and roadblocks and overcome any challenges we came across.

Another challenge was training our AI as we did not have access to an extensive dataset so we built it up from scratch thanks to some previous machine learning experience on our team we were able to implement a chatbot that provided students with great responses to critical queries.

Many team members also had minimal experience in JavaScript coming into this hackathon, but thanks to a great team member always willing to help I think that we can all say that we learned something new and had a great experience learning a new language.

### Accomplishments that we're proud of

We are proud of working as a team to implement a solution to a problem that we all face as students, time management. As the tool was being developed we could all see ourselves using this application after this hackathon to both assists in managing our time but also providing valuable insights and information right at our fingertips.

The great performance of our chatbot was also a feature that we were proud of. In the limited time that we had, we are proud of the extensive requests that we were able to handle with our chatbot, especially the chatbot making sure that the students received the information that they needed at the right time (Wellness Services/Campus Security).

### What we learned

Many people it was their first time creating a full-stack application as a team experience learning to put all the moving parts of the application together. I think that almost everyone on the team gained valuable insights into different parts of the stack that they had previously not had experience in before.

### What's next for StudyBudy

Everyone in the group is looking forward to further developing the skills that they have built a foundation for at the hackathon. We all look forward to working with each other again in the future both in-class, outside of class, and at the next hackathon.
