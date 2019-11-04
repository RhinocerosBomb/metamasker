import React from 'react';
import '../about.css';
import images from '../images/user.png';

function About() {
  return (
    <div className="aboutPage">

      <div class="container">

        <h2>    What is Lorem Ipsum?</h2>
        <p>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>


      <div class="container flex">

        <div class="box">
            <div class="picTeam">
              <img src= {images}/>
            </div>
            <div class="descriptionTeam">
              <h2>KASRA</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </div>
        </div>

        <div class="box">
            <div class="picTeam">
                <img src="https://ca.slack-edge.com/TMYSQE80G-UN2L48TPX-9c5f8f12cc85-512"/>
            </div>
            <div class="descriptionTeam">
              <h2>JASON</h2>
              <p>RedBalls! Cocaine in a can baby!</p>
            </div>
        </div>

        <div class="box">
            <div class="picTeam">
                <img src= {images}/>
            </div>
            <div class="descriptionTeam">
              <h2>SAMI</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>

      </div>


    </div>
  );
}

export default About;
