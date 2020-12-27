import React, { Fragment, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }

  * {
    font-family: "微軟正黑體";
        box-sizing: border-box;
  }
`

const Container = styled.div`
  width: 645px;
  height: auto;
  border-top: solid 8px #fad312;
  margin: 120px auto 66px auto;
  background-color: #fff;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 40px;
`

const Form = styled.form`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 36px;
  letter-spacing: 1.8px;
  margin-bottom: 35px;
`

const Info = styled.h4`
  font-size: 14px;
  margin: 0px
`

const Note = styled.div`
  font-size: 16px;
  color: #e74149;
  margin-top: 22px;
  margin-bottom: 22px;
`

const Star = styled.span`
  color: #e74149;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  & label {
    font-size: 20px;
    margin-bottom: 20px;
  }

  & input {
    font-size: 16px;
    color: #afafaf;
    width: 287px;
    height: 23px;
    border: solid 1px #d0d0d0;
  }
`

const Warn = styled.div`
  color: #e74149;
  font-size: 14px;
  margin-top: 5px;
`
const Text = styled.span`
  font-size: 14px;
`

const SubmitButton = styled.input`
  font-size: 15px;
  width: 96px;
  height: auto;
  padding: 12px 32px;
  display: inline-block;
  background-color: #fad312;
  border-radius: 3px;
  cursor: pointer;
  color: black;
  border-style: none;
`
const Arguement = styled.p`
  font-size: 14px;
`

const Radio = styled.div`
  padding: 0px;
  margin-top: 24px;
  & input {
    font-size: 13px;
    width: initial;
    height: initial;
    margin-bottom: initial;
  }

  & label {
    font-size: 14px;
    height: initial;
    color: black;
    display: inline-block;
    margin-bottom: initial;
  }
`

const Footer = styled.div`
  font-size: 13px;
  color: #999;
  text-align: center;
  padding: 24px 12px;
  background-color: black;
`

function App() {
  const initialInput = {nickname: "", email: "", number: "", applytype: "", know: "", advise: ""}
  const [values, setValues] = useState(initialInput)
  const [isValid, setIsValid] = useState(true)
  
  const {nickname, email, number, applytype, know, advise} = values
  const handleChange = (e) => {
    setValues(
      {...values, [e.target.name]: e.target.value}
    )
  } 

  const handleSubmit = (event) => {
    event.preventDefault()
    if (nickname === "" || email === "" || number === "" || applytype === "" || know === "") {
      setIsValid(false)   
    } else {
      alert(JSON.stringify(values))
      setIsValid(true)
    }
  }
  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>新拖延運動報名表單</Title>
          <Info>活動日期：2020/12/10 ~ 2020/12/11</Info>
          <Info>活動地點：台北市大安區新生南路二段1號</Info>
          <Note><Star>*</Star> 必填</Note>
          <Item>
            <label htmlFor="nickname">暱稱 <Star>*</Star></label>
            <input type="text" id="nickname" name="nickname" placeholder="您的回答" onChange={handleChange} value={nickname}/>
            {!isValid && !nickname && <Warn>請填寫暱稱</Warn>}
          </Item>
          <Item>
            <label htmlFor="email">電子郵件 <Star>*</Star></label>
            <input type="text" id="email" name="email" placeholder="您的電子郵件" onChange={handleChange} value={email}/>
            {!isValid && !email && <Warn>請填寫暱稱</Warn>}
          </Item>
          <Item>
            <label htmlFor="number">手機號碼 <Star>*</Star></label>
            <input type="text" id="number" name="number" placeholder="您的手機號碼" onChange={handleChange}/>
            {!isValid && !number && <Warn>請填寫暱稱</Warn>}
          </Item>
          <Item>
            <label>報名類型 <Star>*</Star></label>
            <Radio>
              <input type="radio" id="applytype_a" name="applytype" value="1" onChange={handleChange}/>
              <label htmlFor="applytype">躺在床上用想像力實作</label>
            </Radio>
            <Radio>
              <input type="radio" id="applytype_b" name="applytype" value="2" onChange={handleChange}/>
              <label htmlFor="applytype">趴在地上滑手機找現成的</label>
            </Radio>
            {!isValid && !applytype && <Warn>請填寫暱稱</Warn>}
          </Item>
          <Item>
            <label htmlFor="know">怎麼知道這個活動的? <Star>*</Star></label> 
            <input type="text" id="know" name="know" placeholder="您的回答" onChange={handleChange}/>
            {!isValid && !know && <Warn>請填寫暱稱</Warn>}
          </Item>
          <Item>
            <label htmlFor="advise">其他<br /><Text>對活動的一些建議</Text></label>
            <input type="text" id="advise" name="advise" placeholder="您的回答" onChange={handleChange}/>
          </Item>
          <SubmitButton type="submit"/>
          <Arguement>請勿透過表單送出你的密碼。</Arguement>
        </Form>
      </Container>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </Fragment>
  )
}

export default App;
