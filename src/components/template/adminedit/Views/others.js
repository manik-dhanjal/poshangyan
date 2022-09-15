import React, { Component } from "react";
import axios from "axios";
import AlertPopup from './AlertPopup'
import Chips from './Chip'
import { Icon, Label } from 'semantic-ui-react'
import MuiGrid from "@material-ui/core/Grid";
import './others.css'
import SnackBar from './SnackBar'
import NewDataEntryForm from "./NewDataEntryForm";

// import './others.css'
// {
//     "themes": [
//         "Girls Education, Diet & Right Age of Marriage",
//         "Poshan Pakhwada"
//     ],
//     "languages": [
//         "Assamese",
//         "English"
//     ],
//     "mediaType": [
//         "Any",
//         "Social Media"
//     ],
//     "mimetype": [
//         "Images",
//         "GIFs"
//     ],
//     "targetAudience": [
//         "Any",
//         "other"
//     ],
//     "sources": [
//         "Any",
//         "others"
//     ],
// }
export class Others extends Component {
    state = {
        themes: [],
        languages: [],
        mediaType: [],
        mimetype: [],
        targetAudience: [],
        sources: [],
        temp_themes: [],
        temp_languages: [],
        temp_mediaType: [],
        temp_mimetype: [],
        temp_targetAudience: [],
        temp_sources: [],
        showSnackbar: false,
        snackbarMessage: '',
        snackBarType: 'error',
    }

    componentDidMount() {
        axios.get('/getSortingData')
            .then(res => {
                let dat = res.data;
                this.setState({
                    themes: dat.themes,
                    languages: dat.languages,
                    mediaType: dat.mediaType,
                    mimetype: dat.mimetype,
                    targetAudience: dat.targetAudience,
                    sources: dat.sources,
                    temp_themes: dat.themes,
                    temp_languages: dat.languages,
                    temp_mediaType: dat.mediaType,
                    temp_mimetype: dat.mimetype,
                    temp_targetAudience: dat.targetAudience,
                    temp_sources: dat.sources,
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }
    setSnackbarMessageAndTimeOut(message) {
        this.setState({
            snackbarMessage: message,
            showSnackbar: true
        })
        setTimeout(() => {
            try {
                this.setState({
                    showSnackbar: false,
                    snackbarMessage: ''
                })
            } catch {

            }
        }, 2000)
    }
    modifyData = async (type, val, new_val) => {
        let token = localStorage.getItem("auth-token");
        axios.post('./modifySortingData', { type, val, new_val},{headers: { "x-auth-token": token },})
            .then((res) => {
                let dat = res.data;
                if (res.data.message !== 'not authorised!!') {
                    this.setState({
                        themes: dat.themes,
                        languages: dat.languages,
                        mediaType: dat.mediaType,
                        mimetype: dat.mimetype,
                        targetAudience: dat.targetAudience,
                        sources: dat.sources,
                        temp_themes: dat.themes,
                        temp_languages: dat.languages,
                        temp_mediaType: dat.mediaType,
                        temp_mimetype: dat.mimetype,
                        temp_targetAudience: dat.targetAudience,
                        temp_sources: dat.sources,
                        snackBarType: 'success'
                    })
                    this.setSnackbarMessageAndTimeOut('Successfully Updated!')
                    return;
                }
                this.setSnackbarMessageAndTimeOut('Something went wrong!')
                return;
            })
            .catch((e) => {
                console.log(e);
                this.setSnackbarMessageAndTimeOut('Something went wrong!')
            })
    }
    deleteItem = (type, val) => {
        let token = localStorage.getItem("auth-token");
        axios.post('./deleteFromSortingData', { type, val},{headers: { "x-auth-token": token },})
            .then((res) => {
                let dat = res.data;
                if (res.data.message !== 'not authorised!!') {
                    this.setState({
                        themes: dat.themes,
                        languages: dat.languages,
                        mediaType: dat.mediaType,
                        mimetype: dat.mimetype,
                        targetAudience: dat.targetAudience,
                        sources: dat.sources,
                        temp_themes: dat.themes,
                        temp_languages: dat.languages,
                        temp_mediaType: dat.mediaType,
                        temp_mimetype: dat.mimetype,
                        temp_targetAudience: dat.targetAudience,
                        temp_sources: dat.sources,
                        snackBarType: 'success'
                    })
                    this.setSnackbarMessageAndTimeOut('Successfully Deleted!')
                    return;
                }
                this.setSnackbarMessageAndTimeOut('Something went wrong!')
                return;
            })
            .catch((e) => {
                console.log(e);
                this.setSnackbarMessageAndTimeOut('Something went wrong!')
            })
    }

    // deleteItem = (type, val) => {
    //     switch (type) {
    //         case 'languages':
    //             break;
    //         case 'themes':
    //             break;
    //         case 'mediaType':
    //             break;
    //         case 'mimetype':
    //             break;
    //         case 'targetAudience':
    //             break;
    //         case 'sources':
    //             break;
    //     }
    // }

    render() {
        let { type } = this.props;
        let lang_chips = this.state.languages.map(pos => <Chips val={pos} type={'languages'} edit={this.modifyData} delete={this.deleteItem} fromPos='true' key={pos} />)
        let theme_chips = this.state.themes.map(pos => <Chips val={pos} type={'themes'} edit={this.modifyData} delete={this.deleteItem} fromPos='true' key={pos} />)
        let source_chips = this.state.sources.map(pos => <Chips val={pos} type={'sources'} edit={this.modifyData} delete={this.deleteItem} fromPos='true' key={pos} />)
        let mediatype_chips = this.state.mediaType.map(pos => <Chips val={pos} type={'mediaType'} edit={this.modifyData} delete={this.deleteItem} fromPos='true' key={pos} />)
        let mimetype_chips = this.state.mimetype.map(pos => <Chips val={pos} type={'mimetype'} edit={this.modifyData} delete={this.deleteItem} fromPos='true' key={pos} />)
        let ta_chips = this.state.targetAudience.map(pos => <Chips val={pos} type={'targetAudience'} edit={this.modifyData} delete={this.deleteItem} fromPos='true' key={pos} />)

        let  sumMessage = "Are you really want to delete?"
        let message = `Deleting it means you are going to remove it's existance from the database.
                        If any post contains only deleted value then it will be replaced by "Other". Like if you are deleting ANC from theme
                        and if any post contains only ANC as theme, then new theme of that post will be  "Other". Same in case of languages,target audiances etc. `

        return (
            <div className="others__root" >
                <SnackBar showSnackbar={this.state.showSnackbar} snackBarType={this.state.snackBarType} message={this.state.snackbarMessage} />
                { type == 'Languages' && <div> <h1 className="Prop_heading">Languages</h1>
                    <div className="new__data_entry_form">
                        <NewDataEntryForm type={'languages'} addNewData={this.modifyData} />
                    </div>
                    <MuiGrid container style={{ padding: 10 }} spacing={3}>
                        {lang_chips}
                    </MuiGrid></div>}
                { type == 'Themes' && <div> <h1 className="Prop_heading">Themes</h1>
                    <div className="new__data_entry_form">
                        <NewDataEntryForm type={'themes'} addNewData={this.modifyData} />
                    </div>
                    <MuiGrid container style={{ padding: 10 }} spacing={3}>
                        {theme_chips}
                    </MuiGrid></div>}
                { type == 'Others' && <div> <h1 className="Prop_heading">Sources</h1>
                    <div className="new__data_entry_form">
                        <NewDataEntryForm type={'sources'} addNewData={this.modifyData}/>
                    </div>
                    <MuiGrid container style={{ padding: 10 }} spacing={3}>
                        {source_chips}
                    </MuiGrid></div>}
                { type == 'Others' && <div> <h1 className="Prop_heading">Target Audiance</h1>
                    <div className="new__data_entry_form">
                        <NewDataEntryForm type={'targetAudience'} addNewData={this.modifyData} />
                    </div>
                    <MuiGrid container style={{ padding: 10 }} spacing={3}>
                        {ta_chips}
                    </MuiGrid></div>}
                { type == 'Others' && <div> <h1 className="Prop_heading">File Type</h1>
                    <div className="new__data_entry_form">
                        <NewDataEntryForm type={'mimetype'} addNewData={this.modifyData} />
                    </div>
                    <MuiGrid container style={{ padding: 10 }} spacing={3}>
                        {mimetype_chips}
                    </MuiGrid></div>}
                { type == 'Others' && <div> <h1 className="Prop_heading">Media Type</h1>
                    <div className="new__data_entry_form">
                        <NewDataEntryForm type={'mediaType'} addNewData={this.modifyData} />
                    </div>
                    <MuiGrid container style={{ padding: 10 }} spacing={3}>
                        {mediatype_chips}
                    </MuiGrid></div>}

            </div>
        )
    }
}

export default Others;
