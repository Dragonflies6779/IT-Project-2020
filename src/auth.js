import fire from './config/Fire';
class Login {
    static loginWithEmailAndPassword(email, password){
        console.log(email);
        fire.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
              console.log(user);
          })
          .catch((error) => {
              alert("incorrect username or password");
          });
    }
}
export default Login;