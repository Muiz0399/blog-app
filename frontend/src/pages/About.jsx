import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div className="container mx-auto my-12 p-8 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          {profile?.user?.name}
        </strong>{" "}
        a proficient full stack developer with a robust skill set spanning both
        front-end and back-end technologies. With a passion for building
        dynamic, responsive, and user-friendly web applications.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
          I am a proficient MERN (MongoDB, Express, React, Node.js) stack developer and digital marketer. I specialize in building full-stack web applications, utilizing React for interactive front-end development and Node.js with MongoDB for scalable back-end solutions. With experience in tools like Axios, Formik, and JWT, I excel in creating seamless user experiences and solving technical challenges, particularly in database management and API integration.

          As a digital marketer, I focus on social media marketing for platforms like Amazon, Shopify, and Facebook, combining my technical expertise with marketing strategies to drive e-commerce success.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Professional Highlights:
      </h2>
      <p>
        Successfully developed and deployed numerous full-stack applications,
        demonstrating strong problem-solving skills and a keen eye for detail.
        Collaborated with cross-functional teams to deliver high-quality
        software solutions within tight deadlines. Continuously learning and
        adapting to emerging technologies and industry trends to stay ahead in
        the fast-evolving tech landscape.
      </p>
      <br />
      <span>
        Muiz is dedicated to leveraging his expertise to contribute to
        innovative projects and drive technological advancements. Whether
        working on front-end interfaces or back-end logic, he is passionate
        about delivering exceptional digital solutions that meet user needs and
        exceed client expectations.
      </span>
      <h2 className="font-semibold text-blue-800 text-xl">
        Personal Interests and Inspiration:
      </h2>
      <p>
        Outside of work, I have a deep passion for creativity and strategy. I love to sketch, often using it as a way to express ideas and relax my mind. Chess is another hobby I enjoy, as it challenges my problem-solving skills and strategic thinking, much like coding. I also enjoy playing badminton, which helps me stay active and sharp. When it comes to unwinding, I love immersing myself in books, whether it’s exploring new ideas, learning, or just enjoying a great story.</p>
    </div>
  );
}

export default About;
