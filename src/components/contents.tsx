import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  TagOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { Modal } from "antd";
import "../App.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
//import Tags from "./tags";
import { Space,Tag, Tooltip } from 'antd';
import React, { useRef, useState,useEffect } from 'react';
import { CloseOutlined} from '@ant-design/icons';
import type { InputRef } from 'antd';
//import CommentLists from "./commentLists";

const initUser = { email: "joe@gmail.com", username: "" };

const { Header, Sider, Content } = Layout;

const { TextArea } = Input;

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder="You can add comments here"
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        className="btnComment"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Post
      </Button>
    </Form.Item>
  </>
);

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
    className="listCommentProp"
  />
);

function Contents() {
  const [tags, setTags] = useState<string[]>(['']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  //const [close, setClose] = useState(true);
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState(initUser);
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState("");
  const [data, setData] = useState<any>([]);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);

   


  useEffect(() => {
     
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  
  const handleClose = (removedTag:any) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }

    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e:any) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };


  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          datetime: moment().subtract(1, "days").fromNow(),
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
        },
      ]);
    }, 1000);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const toggleinput = () => {
    setToggle(!toggle);
    console.log("toggle==>", toggle);
  };

  const activeHandle = () => {
    setActive(!active);
     
  };

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
    const { username, email, value }: any = e.target;
    setFormValue({ ...formValue, [username]: value, [email]: value });
    setUser(e.target.value);
    console.log(formValue);
  };

  const onKeyChange = (e: any) => {
    if (e.key === "Enter") {
      const datas = { username: userName, email: user };
      setData((data: any) => [...data, datas]);
    }
  };

  const handleRemove = (index: any) => {
    console.log(index);
    data.splice(index, 1);
    setData([...data]);
  };

  return (
    <Layout>
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
              <label style={{ fontSize: 16, marginBottom: "5px" }}>
                <strong>userName</strong>{" "}
              </label>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  type="text"
                  name="username"
                  placeholder="Type Name"
                  onChange={(value) => setUserName(value.target.value)}
                />
              </Form.Item>

              <label style={{ fontSize: 16, marginBottom: "10px" }}>
                <strong>Email</strong>{" "}
              </label>
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "The input is not valid E-mail" },
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
                renderItem={(item: any, i: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title={item.username}
                      description={item.email}
                    />
                    <div style={{ fontSize: 20 }}>
                      {" "}
                      <AiOutlineCloseCircle
                        onClick={() => handleRemove(i)}
                        style={{ cursor: "pointer" }}
                      />{" "}
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
      <Layout className="site-layout">
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
              Lorem ipsum vickiie dolor sit amet. Cum accusantium quasi qui
              atque quod et nesciunt molestias ut odit consequatur! In labore
              incidunt sed voluptatum tenetur non nobis ipsa quo aspernatur
              beatae. Aut aliquid quos qui ratione nisi est perspiciatis unde
              eos repellat cupiditate sed necessitatibus veritatis vel fuga odit
              et veniam tempore. Et enim sunt eos perspiciatis magnam ea nihil
              possimus <br /> <br /> eum quia deleniti eum omnis dolores qui
              voluptate inventore. At error laborum sed culpa suscipit ad
              expedita officia sit accusamus eaque ex saepe vero! Ut quaerat
              illo ad rerum voluptatem et animi ducimus nam incidunt dolorem ut
              voluptatem rerum ut debitis quam. Eos voluptatem laborum et
              corrupti voluptatem rem autem ipsum et fugit beatae. Ut veniam
              unde aut accusamus quae vel exercitationem error. Ad ipsa tempore
              sed temporibus ipsum sed mollitia <br /> <br /> blanditiis sed
              illum itaque et illo autem! Sed maxime excepturi sit error soluta
              aut quis dolores qui beatae magnam qui voluptate nihil sed
              repellat aliquam. Lorem ipsum dolor sit amet. Cum accusantium
              quasi qui atque quod et nesciunt molestias ut odit consequatur! In
              labore incidunt sed voluptatum tenetur non nobis ipsa quo
              aspernatur beatae. Aut aliquid quos qui ratione nisi est
              perspiciatis unde eos repellat cupiditate sed necessitatibus
              veritatis vel fuga odit et veniam tempore. <br /> <br /> Et enim
              sunt eos perspiciatis magnam ea nihil possimus eum quia deleniti
              eum omnis dolores qui voluptate inventore. At error laborum sed
              culpa suscipit ad expedita officia sit accusamus eaque ex saepe
              vero! Ut quaerat illo ad rerum voluptatem et animi ducimus nam
              incidunt dolorem ut voluptatem rerum ut debitis quam. Eos
              voluptatem laborum et corrupti voluptatem rem autem ipsum et fugit
              beatae. Ut veniam unde aut accusamus quae vel exercitationem
              error. Ad ipsa tempore sed temporibus ipsum sed mollitia
              blanditiis sed illum itaque et illo autem! Sed maxime excepturi
              sit error soluta aut quis dolores qui beatae magnam qui voluptate
              nihil sed repellat aliquam <br /> <br />
            </p>
          </div>
        </Content>

        <Sider width={350} className="site-layout sider-Layout">
          <div className="logo" />
          <Menu
            className="siderMenuList"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UsergroupAddOutlined />,
              },
              {
                key: "2",
                icon: <MessageOutlined onClick={toggleinput} />,
              },
              {
                key: "3",
                icon: <TagOutlined onClick={activeHandle} />,
              },
              {
                key: "4",
                icon: <EditOutlined />,
              },
            ]}
          />

             {active &&  <div className="section-tag"> 
       
       <div  className='tag-header' >
       <span>  Tags </span>
       <CloseOutlined    onClick={()=> setActive(!active)}  />
       </div>
       <hr/>

       {inputVisible && (
      <Input
        ref={inputRef}
        type="text"
        size="small"
        className="tag-input"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    )}

        {!inputVisible && (
       
       <Input  placeholder="Example" onClick={showInput} />
    
       )} 

     <Space direction="horizontal" wrap >
    {tags.map((tag, index) => {
      if (editInputIndex === index) {
        return (
          <Input
            ref={editInputRef}
            key={tag}
            size="small"
            className="tag-input"
            value={editInputValue}
            onChange={handleEditInputChange}
            onBlur={handleEditInputConfirm}
            onPressEnter={handleEditInputConfirm}
          />
        );
      }
     
      const isLongTag = tag.length > 20;
      const tagElem = (
        <Tag
          className="edit-tag"
          key={tag}
          closable={index !== 0}
          onClose={() => handleClose(tag)}
        >
          
          <span
          className='span-tag'
            onClick={(e) => {
              if (index !== 0) {
                setEditInputIndex(index);
                setEditInputValue(tag);
                e.preventDefault();
              }
            }}
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </span>
        </Tag>
      );
      
      return isLongTag ? (
        <Tooltip title={tag} key={tag}>
          {tagElem}
        </Tooltip>
      ) : (
        tagElem
      );
    })}
     </Space>
     
   
 </div>   }    

          {toggle && (
            <div className="commentSectionHead">
              <div>
                <div className="commentsHead">
                  <span className="commentTitle"> Comments</span>
                  <span className="xmark" onClick={()=> setToggle(!toggle) }>
                    X
                  </span>
                </div>
                <hr className="commentSectionLine" />

                <Comment
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <Editor
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  }
                />

                {comments.length > 0 && <CommentList comments={comments} />}
              </div>
            </div>
          )}
        </Sider>
      </Layout>
    </Layout>
  );
}

export default Contents;
