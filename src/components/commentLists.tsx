import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState} from 'react';
 


const { TextArea } = Input;

// const savedItem = localStorage.getItem("value");
// // const commentLocalStorage = (JSON.parse(savedItem?? '') || '[]');
//  const commentLocalStorage = JSON.parse((localStorage.getItem("value") || '[]'))

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
      <TextArea rows={4} onChange={onChange} value={value} placeholder="You can add comments here" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" className='btnComment' loading={submitting} onClick={onSubmit} type="primary">
        Post
      </Button>
    </Form.Item>
  
  </>
);
 

const CommentList = ({ comments }: { comments: CommentItem[] }) => (

   <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
    className='listCommentProp'
  />
  
 
);

const CommentLists = ({handleCancel}:any) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  //const [close, setClose] = useState(true);

  
  // useEffect(() => { 
  // localStorage.setItem("value",JSON.stringify(value))
  // });

   
  // useEffect(() => { 
     
  //   const result = window.localStorage.getItem('values')
  //    if (result !== null){
  //     setValue(JSON.parse(result))
  //    }
  //   },[]);
  

  const handleSubmit = () => {     
 
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
       setComments([
        ...comments,
        {
          author: 'Han Solo',
          datetime: moment().subtract(1, 'days').fromNow(),
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          
        },
      ]);
    }, 1000);
  };

  const handleChange = (e:any) => {
    setValue(e.target.value);
  };

  return (
    <>
   
        <div className='commentSectionHead'> 


        <div >
              <div className='commentsHead'>
                <span className='commentTitle'> Comments</span>
                <span className='xmark' onClick={handleCancel}>X
                </span>
                  
                    
               </div>  
                 <hr className='commentSectionLine' />
   
     
     <Comment
       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
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
       

    
      
    </>
     
  );
};

export default CommentLists;