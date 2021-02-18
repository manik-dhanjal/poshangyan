import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import styled from 'styled-components'
import { Button, Dropdown, TextArea, Form, Loader, Dimmer} from "semantic-ui-react";

const Div = styled.div`
.custom-input{
    width:100%;
    margin-bottom:15px;
}
height:100%;
.form{
    margin-top:50px;
}
.submit-cont{
    margin-top:20px;
}
`;

const ThemeOfMonth = () => {
    const handleChange = (s,e) =>{
        setData({...data,[e.name]:e.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await setData({...data,status:'pending'})
            const dat = await axios.post('/set-theme-of-the-month',{
                theme:data.theme,
                quote:data.quote
            })
            await setData({...data,status:'success'})
            console.log(dat,'updated successfully')
        }
        catch(e){
            await setData({...data,status:'fail'})
            console.log(e,'failed to update')
        }
        
    }
    const [data,setData] = useState({
        status:'pending',
        theme:'',
        quote:''
    })
    useEffect(()=>{
        console.log(data)
    })
    useEffect( ()=>{
        (async () => {
            try{
    let key = localStorage.getItem('passkey');
            
            const res = await axios.post('/set-theme-of-the-month') 
            console.log(res)
            setData({
                status:'success',
                theme:res.data.theme,
                quote:res.data.quote,
                passkey: key 
             })
        }catch(e){
            console.log(e)
            setData({
                status:'fail',
                theme:'',
                quote:''
             })
        }
            
        })()
    },[])
    const sortMenuTab = (options) =>{
        var any = false;
        var other = false;
        var temp = [];  
         options.forEach(e=>{
            if(e === "Any") any=true
            if(e === "others") other=true;
            if(e !== "Any" && e !== "others")
             temp.push( {text:e,value:e} )
         })
         temp = temp.sort((a,b)=> ( '' + a.label).localeCompare(b.label) )
 
         if(any) temp.unshift({text:"Any",value:"Any"})
         if(other) temp.push({text:"others",value:"others"})
         return temp;
    }
    return (
        <Div>
            <Form className='form' onSubmit={handleSubmit}>
                {
                    data.status=='pending'?
                    <Dimmer active inverted>
                        <Loader inverted/>
                    </Dimmer>
                    : (
                            data.status=='success'?(
                            <>
                                <div className="select-cont">
                                        <Dropdown 
                                            placeholder='Theme of The month' 
                                            fluid
                                            required
                                            search 
                                            selection 
                                            options={sortMenuTab(themeList)} 
                                            defaultValue={data.theme} 
                                            onChange={handleChange} 
                                            name="theme" 
                                            className='custom-input'
                                        />
                                </div>
                                <TextArea  onChange={handleChange} placeholder="Quote" name='quote'className='custom-input' value={data.quote} required/>
                                <div className='submit-cont'>
                                    <Button inverted color="green"  type='submit'>
                                        Update  
                                    </Button>                                    
                                </div>
                            </>
                            ):<h2>Unable to load data</h2>
                    )
                }
                </Form>
        </Div>
    )
}

export default ThemeOfMonth

const themeList = [
    "Ante Natal Care",
    "Breastfeeding",
    "Anaemia Prevention",
    "Immunization",
    "Growth Monitoring",
    "Sanitation/ WASH",
    "Diarrhoea Management",
    "Diet Diversity/ Overall Nutrition",
    "Nutri Cereal",
    "Food Fortification",
    "Girls Health and Education",
    // "Poshan Pakhwada",
    "Complementary Feeding",
    "Vit A supplements",
    "Deworming"
  ]