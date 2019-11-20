import { Drawer, Button } from 'antd';
import React from 'react';

class showDrawer extends React.Component {
  state = { visible: true };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div style={{textAlign:"center"}}>
        <Button type="primary" onClick={this.showDrawer}>
          Unblock
        </Button>
        <Drawer
          title="Unblock Notifications"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Follow these instrucations to allow notifications:</p>
          <p>1. Access Settings by tapping the three menu dots.</p>
          <p>2. Click Site settings under Advanced.</p>
          <p>3. Click Notifications.</p>
          <p>4. Find and Click this entry for this website.</p>
          <p>5. Click Notifications and set it to Allow.</p>
        </Drawer>
      </div>
    );
  }
}

export default showDrawer;