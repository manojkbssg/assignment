import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Tabs, Collapse, Col, Row, Typography, Button, Radio, notification, Modal,List, Steps, Input,Card} from 'antd'; 
const { Text, Link } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const Tabform = () => { 
  const [tab, setTab] = useState(1); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  function callback(key) { 
    const val = Number(key.target.value);
    setTab(val); 
    val===1 && setSchema(schema1); 
    val===2 && setSchema(schema2);  
  }

  let schema1 =  {
    name: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('This is a required field'), 
    email: Yup.string().email('Invalid email address').required('This is a required field'),
  }; 
    
  let schema2 =  {
    add1: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('This is a required field'),  
        /* add2: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('This is a required field'),  */ 
    }

    let schema3 =  {
      education: Yup.string().required('This is a required field') 
    }


    const [schema, setSchema] = useState(schema1);

 
  const onSubmit = (values)=> {
    //alert(JSON.stringify(values, null, 2));
    switch(tab) {
      case 1: 
        setTab(2);
        setSchema(schema2);
        break;
      case 2:  
        setTab(3);
        setSchema(schema3);
        break;
      case 3: 
      //alert(JSON.stringify(values, null, 2));
      setIsModalOpen(true);
      setTab(1);
      setSchema(schema1);
      notification.success({message:"Form data successfully submited.", placement:"top"});
      break; 
      default: alert(JSON.stringify(values, null, 2));
    }
  }


 
  const formik = 
    useFormik({
      initialValues: {
        name: '', 
        email: '',
        add1: '',
        add2: '',
        education: '',
      },
      validationSchema:Yup.object(schema) ,
      onSubmit,
    });
    
    const modelClose = ()=>{
       formik.resetForm();
      setIsModalOpen(false);
     }


    const tab1 = (  <div> 
    <br/><br/> 
    <Row>
      <Col span={6}><label htmlFor="lastName">Full Name</label></Col>
      <Col span={18}>
      <Input  
         id="name"
         name="name"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.name}
       /><br/>
       {formik.touched.name && formik.errors.name ? (
         <Text type="danger">{formik.errors.name}</Text>
       ) : null} 
       <br/> 
      </Col>
    </Row>

    <Row>
      <Col span={6}><label htmlFor="lastName"><label htmlFor="email">Email Address</label></label></Col>
      <Col span={18}>
      <Input
         id="email"
         name="email"
         type="input"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       /><br/>
       {formik.touched.email && formik.errors.email ? (
         <Text type="danger">{formik.errors.email}</Text>
       ) : null}<br/><br/>
      </Col>
    </Row>  
    </div>);

 const tab2 = (    <Collapse defaultActiveKey={['1']} onChange={()=>{}} >
 <Panel header="Current Address" key="1">
   {/* Address */}
   <Row>
      <Col span={6}><label htmlFor="lastName">Current Address</label></Col>
      <Col span={18}>
      <Input
         id="add1"
         name="add1"
         type="text" 
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.add1}
       /><br/>
       {formik.touched.add1 && formik.errors.add1 ? (
         <Text type="danger">{formik.errors.add1}</Text>
       ) : null} 
       <br/> 
      </Col>
    </Row>
 </Panel>
 <Panel header="Permanent Address" key="2">
   {/* Address */}
   <Row>
      <Col span={6}><label htmlFor="lastName">Permanent Address</label></Col>
      <Col span={18}>
      <Input 
         id="add2"
         name="add2"
         type="text" 
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.add2}
       /><br/>
       {formik.touched.add2 && formik.errors.add2 ? (
         <Text type="danger">{formik.errors.add2}</Text>
       ) : null} 
       <br/> 
      </Col>
    </Row>
 </Panel> 
</Collapse>);


const tab3 = (   <Row>
  <Col span={4}><label htmlFor="lastName">Education</label></Col>
  <Col span={18}>
  <Input
     id="education"
     name="education"
     type="text"
     style={{width:'50%'}}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     value={formik.values.education}
   /><br/>
   {formik.touched.education && formik.errors.education ? (
     <Text type="danger">{formik.errors.education}</Text>
   ) : null} 
   <br/> 
  </Col>
</Row>);

 
  return   (
    <Card   style={{ width: 800, marginLeft:"80px" }}>
  <form onSubmit={formik.handleSubmit} novalidate>
     <Row>
    <Col span={24}>  
  <Steps
    current={tab-1}
    items={[{
        title: 'Customer Details', 
      },
      {
        title: 'Address', 
      },
      {
        title: 'Education', 
      },
    ]}
  />
  </Col>
</Row> <br/><br/>
    <Radio.Group value={tab} onChange={callback} style={{ marginBottom: 16 }}>
            <Radio.Button value={1}>Customer Details</Radio.Button>
            <Radio.Button value={2}  disabled={tab<2}>Address</Radio.Button>
            <Radio.Button value={3} disabled={tab<3}>Education</Radio.Button>
    </Radio.Group>
    {tab ===1 && tab1}
    {tab ===2 && tab2}
    {tab ===3 && tab3} 
  <Row style={{float: 'right'}} >
    <Col span={24} >
      <br/>
    <Button type="primary" htmlType="submit"> {tab!==3?'Save & Continue':'Submit' }</Button>
    </Col>
  </Row> 
  <Modal title="Form Data" open={isModalOpen} onOk={modelClose}  onCancel={modelClose}>
<List
      size="small" 
      bordered
      dataSource={Object.entries(formik.values).map(e=>e[0]+": "+e[1])}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
</Modal>
</form></Card>
);
};
export default Tabform;