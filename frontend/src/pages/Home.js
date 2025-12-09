import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
   const navigate = useNavigate();

   return (
      <div
         /*style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textAlign: "center",
            padding: "20px",
         }}*/
      >
         <div
            /*style={{
               maxWidth: "600px",
               backgroundColor: "rgba(255, 255, 255, 0.1)",
               padding: "50px",
               borderRadius: "20px",
               backdropFilter: "blur(10px)",
            }}*/
         >
            <h1
               style={{
                  fontSize: "3.5rem",
                  marginBottom: "20px",
                  fontWeight: "bold",
               }}
            >
               <span
                  style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "8px",
                     justifyContent: "center",
                  }}
               >
                  <ion-icon name="barbell-outline"></ion-icon>
                  Fitness Tracker
               </span>
            </h1>

            <p
               style={{
                  fontSize: "1.3rem",
                  marginBottom: "40px",
                  lineHeight: "1.6",
               }}
            >
               Track your workouts, monitor your progress, and achieve your
               fitness goals!
            </p>

            <div
               style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
               }}
            >
               <button
                  onClick={() => navigate("/login")}
                  style={{
                     padding: "15px 40px",
                     fontSize: "1.1rem",
                     backgroundColor: "white",
                     color: "#667eea",
                     border: "none",
                     borderRadius: "30px",
                     cursor: "pointer",
                     fontWeight: "bold",
                     transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) =>
                     (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
               >
                  <span
                     style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                     }}
                  >
                     <ion-icon name="person-outline"></ion-icon>
                     Login
                  </span>
               </button>
               <button
                  onClick={() => navigate("/register")}
                  style={{
                     padding: "15px 40px",
                     fontSize: "1.1rem",
                     backgroundColor: "transparent",
                     color: "white",
                     border: "2px solid white",
                     borderRadius: "30px",
                     cursor: "pointer",
                     fontWeight: "bold",
                     transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) =>
                     (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
               >
                  <span
                     style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                     }}
                  >
                     <ion-icon name="person-add-outline"></ion-icon>
                     Sign Up
                  </span>
               </button>
            </div>

            <div
               style={{ marginTop: "50px", fontSize: "0.9rem", opacity: "0.8" }}
            >

            </div>
         </div>
      </div>
   );
}

export default Home;
