
import UpLoadFile from "../page/UpLoad/UpLoadFile/UpLoadFile.jsx";
import TestState from "./Test.mobx.js"
class Test extends React.Component {
  render() {
    return (
      <div>
        <UpLoadFile MaxFile={10} store={this.store.UpLoadFileMC} />
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.store = new TestState();
  }
  handleSubmit=async ()=>{
      try{
        this.store.submit()
      }catch(error){
          console.log(error);
          
      }
  }
}

export default Test;
