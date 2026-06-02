import LoginForm from "../../components/loginForms";
import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <main
      className="
        
      "
    >
      <div
        className="
       
        "
      >

            <h1
            className="
            
              "
            >
             
            </h1>

            <p 
            className="
           
            
            ">
           
            </p>
          </div>
          <div className="
          
          ">
            
            <LoginForm onSend={loginAction} />
          
        </div>
    </main>
  );
}