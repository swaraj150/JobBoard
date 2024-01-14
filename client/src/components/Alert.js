import { useRegister } from "../Context/RegisterState"
function Alert(props) {
    const { alert } = useRegister();
    const show=(word)=>{
        if(word==="danger"){
          word="error"
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }
    return (
      <div style={{height:"35px"}}>
          {alert && <div className={`alert alert-${alert.type}  alert-dismissible fade show`} role='alert'>
              <strong>{show(alert.type)}</strong>: {alert.msg}
          </div>}
      </div>
    )
  }
  export default Alert