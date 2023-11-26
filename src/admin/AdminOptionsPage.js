import React from 'react';

import URLConsts from '../constants/URLConsts';

import './css/AdminOptionsPage.css';

class AdminOptionsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        ipBanList: "UNIMPLEMENTED FUNCTION",
        removeNickname: "",

        removeAllScoresBtnEnabled: true,
        removeScoresWNickBtnEnabled: true,
        banIpAddressBtnEnabled: true,
        unbanIpAddressBtnEnabled: true,
        logoutBtnEnabled: true
    };

    render () {
        return (
            <div className="AdminOptionsPage">
                <h2>Admin Options</h2>

                <p className="RoundBorder">
                    <button disabled={!this.state.removeAllScoresBtnEnabled} 
                        onClick={() => {this.handleRemoveAllScores();}}
                        >Remove All Scores</button>
                </p>

                <p className="AdminRow RoundBorder">
                    <input type="text" onChange={
                        (event) => {
                            this.setState({removeNickname: event.target.value});
                        }}></input>

                    <button disabled={!this.state.removeScoresWNickBtnEnabled}
                        onClick={
                            () => 
                                {this.handleRemoveScoresWithNickname(this.state.removeNickname);}}
                        >Remove Scores With Nickname</button>
                </p>

                <p className="AdminRow RoundBorder">
                    <input type="text"></input>
                    <button disabled={!this.state.banIpAddressBtnEnabled}
                        onClick={() => {this.handleBanIpAddress();}}
                        >Ban IP Address</button>
                </p>

                <p className="AdminRow RoundBorder">
                    <input type="text"></input>
                    <button disabled={!this.state.unbanIpAddressBtnEnabled}
                        onClick={() => {this.handleUnBanIpAddress();}}
                        >Unban IP Address</button>
                </p>                

                <p className="AdminRow RoundBorder">
                    <h3>
                        LIST OF IP BANS
                    </h3>

                    <textarea readOnly={true} value={this.state.ipBanList}></textarea>
                </p>

                <p>
                    <button disabled={!this.state.logoutBtnEnabled}
                        onClick={() => {this.handleAdminLogout();}}>Logout</button>
                </p>
            </div>
        );
    }

    disableAllButtons = () => {
        console.log("Disabling all buttons");

        this.setState({
            removeAllScoresBtnEnabled: false,
            removeScoresWNickBtnEnabled: false,
            banIpAddressBtnEnabled: false,
            unbanIpAddressBtnEnabled: false,
            logoutBtnEnabled: false
        });
    }

    enableAllButtons = () => {
        console.log("Enabling all buttons");

        this.setState({
            removeAllScoresBtnEnabled: true,
            removeScoresWNickBtnEnabled: true,
            banIpAddressBtnEnabled: true,
            unbanIpAddressBtnEnabled: true,
            logoutBtnEnabled: true   
        });
    }

    handleAdminLogout = () => {
        console.log("Trying to log out current admin...");

        this.props.handleAdminLogout();
    }

    handleRemoveAllScores = () => {
        console.log("NOT CURRENTLY IMPLEMENTED!");
    }

    handleBanIpAddress = () => {
        console.log("NOT CURRENTLY IMPLEMENTED!");
    }

    handleUnBanIpAddress = () => {
        console.log("NOT CURRENTLY IMPLEMENTED!");
    }

    handleRemoveScoresWithNickname = async (nickname) => {
        console.log("Handling removing scores with nickname.");

        if (nickname === null || nickname === "" || nickname === undefined) {
            console.log("Nickname cannot be null or empty.");

            return;
        }

        this.disableAllButtons();

        const adminUsername = this.props.adminUsername;
        const adminPassword = this.props.adminPassword;

        const authString = "Basic " + btoa(adminUsername + ":" + adminPassword);

        const nicknameDTO = {
            nickname: nickname
        };

        const url = URLConsts.RPC_BASE_URL + "/admin/remove-scores-with-nickname/";

        const fetchParams = {
            method: 'POST',
            body: JSON.stringify(nicknameDTO),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authString
            }
        };

        let result = await fetch(url, fetchParams)
            .then(async (response) => {
                console.log("Successfully performed Fetch.");

                if (response.ok) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.log("ERROR performing fetch: " + error);

                return false;
            })
        
        console.log("Remove Nickname result: " + result);

        this.enableAllButtons();
    }
}

export default AdminOptionsPage;