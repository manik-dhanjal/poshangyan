import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import styled from 'styled-components'
import { Button, Dropdown, TextArea, Form, Loader, Dimmer} from "semantic-ui-react";
import {useCategories} from "../../context/post.context"

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
    const rawCategories = useCategories();
    
    const handleChange = (s,e) =>{
        setData({...data,[e.name]:e.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await setData({...data,status:'pending'})
            let token = localStorage.getItem("auth-token");

            const dat = await axios.post('/set-theme-of-the-month',{
                theme:data.theme,
                quote:data.quote,
            },{headers: { "x-auth-token": token },})
            await setData({...data,status:'success'})
        }
        catch(e){
            await setData({...data,status:'fail'})
            console.log(e,'failed to update')
        }
        
    }
    const [data,setData] = useState({
        status:'noLoad',
        theme:'',
        quote:''
    })
    useEffect( ()=>{
        (async () => {
            try{
            let token = localStorage.getItem("auth-token");
            const res = await axios.post('/set-theme-of-the-month',null,{headers: { "x-auth-token": token },}) 
            setData({
                status:'success',
                theme:res.data.theme,
                quote:res.data.quote,
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
    const themeList = rawCategories.status==="success"? sortMenuTab(rawCategories.data.themes):[]
    return (
        <Div>
            <Form className='form' onSubmit={handleSubmit}>
                {
                    data.status=='pending'?
                    <Dimmer active inverted>
                        <Loader inverted/>
                    </Dimmer>
                    : (
                        data.status!="noLoad"?(
                            data.status=='success'?(
                            <>
                                <div className="select-cont">
                                        <Dropdown 
                                            placeholder='Theme of The month' 
                                            fluid
                                            required
                                            search 
                                            selection 
                                            options={themeList} 
                                            defaultValue={data.theme} 
                                            onChange={handleChange} 
                                            name="theme" 
                                            className='custom-input'
                                        />
                                </div>
                                <TextArea  onChange={handleChange} placeholder="Quote" name='quote'className='custom-input' value={data.quote}/>
                                <div className='submit-cont'>
                                    <Button inverted color="green"  type='submit'>
                                        Update  
                                    </Button>                                    
                                </div>
                            </>
                            ):<h2>Unable to load data</h2>
                            ):<>
                             <Dimmer active inverted>
                                <Loader inverted/>
                            </Dimmer>
                            </>
                    )
                }
                </Form>
        </Div>
    )
}

export default ThemeOfMonth

// const themeList = [
//     "Ante Natal Care",
//     "Breastfeeding",
//     "Anaemia Prevention",
//     "Immunization",
//     "Growth Monitoring",
//     "Sanitation/ WASH",
//     "Diarrhoea Management",
//     "Diet Diversity/ Overall Nutrition",
//     "Nutri Cereal",
//     "Food Fortification",
//     "Girls Health and Education",
//     // "Poshan Pakhwada",
//     "Complementary Feeding",
//     "Vit A supplements",
//     "Deworming"
//   ]