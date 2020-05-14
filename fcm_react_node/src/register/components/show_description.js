import { Modal } from 'antd';

const { confirm } = Modal;


 const showDescriptions = async () => {
    return new Promise(function(resolve,reject){
      try {     
        confirm({
            title: 'Do you want join us for new amazing news?',
            content: 'BLA BLA BLA',
            okText: 'SURE',
            cancelText: 'NO',
            onOk() {
              localStorage.setItem("permission", "sure");
              return resolve (JSON.stringify({
                "permission":'sure'
              }));
            },
            onCancel() {
              return resolve (JSON.stringify({
                "permission":'no'
              }));
        
            },
          });
      } catch (error) {
        console.error(error);
      }
    })
  }
  export default showDescriptions;