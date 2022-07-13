import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Modal, Button } from "antd";
import React, { useState } from "react";
import "../App.css";
import { Input } from "antd";
import { Form } from "antd";
import { Avatar, List,   } from 'antd';
import { AiOutlineCloseCircle } from "react-icons/ai";
 
 

const initUser = { email: "" , name:"" };

const { Header, Sider, Content } = Layout;

function Contents() {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(initUser);
  const [userName,setUserName] = useState<string>("");
  const [user, setUser] = useState("");
  const [data, setData] = useState<any>([]);
  
 
 
 
  
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: Event) => {
    
    e.preventDefault();
   setFormValue(initUser);  
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,email, value }:any = e.target;
    setFormValue({ ...formValue, [name]: value,[email]: value });
   setUser(e.target.value)
   console.log(formValue);
   
  };

  const onKeyChange = (e:any)=>{

    if(e.key === 'Enter'){
      const datas = {'username':userName,'email':user} 
      setData((data:any) =>[...data, datas])
    }
  }


const handleRemove = (index:any) => {
  console.log(index);
  data.splice(index,1)
  setData([...data])
}

 
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Invited Signatures",
            },
          ]}
          
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span style={{ marginLeft: 40 }}> Add Clauses</span>
          <span style={{ marginLeft: 40 }}> Add Fields</span>

          <Button onClick={showModal} style={{ marginLeft: 90 }}>
            <AiOutlineEdit /> Add Signature
          </Button>

          <Modal
            visible={visible}
            title="Manage Signatories"
            onOk={() => handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key="submit"
                loading={loading}
                onClick={() => handleOk}
                className="mdl-btn-submit"
              >
                Send Invite
              </Button>,
            ]}
          >
            <>
              <Form
                name="basic"
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
              > 
              
              <label style={{fontSize:16, marginBottom:"5px"}}><strong>userName</strong>  </label>
                 <Form.Item
          
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input  type="text" name="username" placeholder="Type Name" onChange={(value)=> setUserName(value.target.value)} />
      </Form.Item>
                 
                <label style={{fontSize:16, marginBottom:"10px"}}><strong>Email</strong>  </label> 
                <Form.Item
                  name="email"
                  rules={[
                    {type:"email", message:"The input is not valid E-mail"},
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    type="email"
                    name="email" 
                    onKeyDown={onKeyChange}
                    placeholder="Type Email"
                    value={formValue.email}
                    onChange={onInputChange}
                   
                  />
                  
                  
                 
                </Form.Item>
              </Form>
              <p>Invited Contracters</p>
              <div
                  id="scrollableDiv"
                  style={{
                    height: 200,
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                 
                    <List
                    
                      itemLayout="horizontal"
                      dataSource={data} 
                      renderItem={(item:any,i:any) => (
                        <List.Item >
                          <List.Item.Meta
                            avatar={
                              <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={
                              item.username
                            }
                            
                            description= 
                               {
                                 item.email
                               }
                             
                          />
                          <div style={{ fontSize: 20 }} >
                            {" "}
                     <AiOutlineCloseCircle onClick={()=>  handleRemove(i)} style={{cursor:'pointer'}} />{" "}
                          </div>
                        </List.Item>
                      
                      )}
                    />
               
              
               </div>
            </>
          </Modal>

          <Button className="head-btn">
            {" "}
            Save <AiOutlineDown style={{ marginTop: 3 }} />
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="container">
            <p className="content">
              Lorem ipsum vickie dolor sit amet. Cum accusantium quasi qui atque quod
              et nesciunt molestias ut odit consequatur! In labore incidunt sed
              voluptatum tenetur non nobis ipsa quo aspernatur beatae. Aut
              aliquid quos qui ratione nisi est perspiciatis unde eos repellat
              cupiditate sed necessitatibus veritatis vel fuga odit et veniam
              tempore. Et enim sunt eos perspiciatis magnam ea nihil possimus{" "}
              <br /> <br /> eum quia deleniti eum omnis dolores qui voluptate
              inventore. At error laborum sed culpa suscipit ad expedita officia
              sit accusamus eaque ex saepe vero! Ut quaerat illo ad rerum
              voluptatem et animi ducimus nam incidunt dolorem ut voluptatem
              rerum ut debitis quam. Eos voluptatem laborum et corrupti
              voluptatem rem autem ipsum et fugit beatae. Ut veniam unde aut
              accusamus quae vel exercitationem error. Ad ipsa tempore sed
              temporibus ipsum sed mollitia <br /> <br /> blanditiis sed illum
              itaque et illo autem! Sed maxime excepturi sit error soluta aut
              quis dolores qui beatae magnam qui voluptate nihil sed repellat
              aliquam. Lorem ipsum dolor sit amet. Cum accusantium quasi qui
              atque quod et nesciunt molestias ut odit consequatur! In labore
              incidunt sed voluptatum tenetur non nobis ipsa quo aspernatur
              beatae. Aut aliquid quos qui ratione nisi est perspiciatis unde
              eos repellat cupiditate sed necessitatibus veritatis vel fuga odit
              et veniam tempore. <br /> <br /> Et enim sunt eos perspiciatis
              magnam ea nihil possimus eum quia deleniti eum omnis dolores qui
              voluptate inventore. At error laborum sed culpa suscipit ad
              expedita officia sit accusamus eaque ex saepe vero! Ut quaerat
              illo ad rerum voluptatem et animi ducimus nam incidunt dolorem ut
              voluptatem rerum ut debitis quam. Eos voluptatem laborum et
              corrupti voluptatem rem autem ipsum et fugit beatae. Ut veniam
              unde aut accusamus quae vel exercitationem error. Ad ipsa tempore
              sed temporibus ipsum sed mollitia blanditiis sed illum itaque et
              illo autem! Sed maxime excepturi sit error soluta aut quis dolores
              qui beatae magnam qui voluptate nihil sed repellat aliquam <br />{" "}
              <br />
            </p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Contents;
 

