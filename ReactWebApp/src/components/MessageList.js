import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import moment from 'moment';

moment.locale("sl-SI");

const messageChipBarStyle = {
    display: "flex",
    flexDirection: "row"
}

const timeStyle = {
    color: "grey",
    fontSize: "0.7em",
    textAlign: "right",
    flex: 1
}

const listStyle = {
    height: "calc(100% - 48px)",
    overflowY: "auto"
}

class MessageList extends React.Component {
    render = () => {
        if (this.props.messages.length === 0)
            return (
                <div>
                    <Subheader>Sporočila</Subheader>
                    <Divider />
                    <List>
                        <p style={{padding: "3rem"}}>Čakanje na sporočila ...</p>
                    </List>
                </div>
            );
        var list = [];
        this.props.messages.forEach((message) => {
            let user = "Neznani uporabnik";
            try {
                user = this.props.users[message.Username]
            } catch (error) { }
            var item = (
                <ListItem key={message.Id}>
                    <div style={messageChipBarStyle}>
                        <Chip>
                            <Avatar icon={<ActionAccountCircle />} />
                            {user.DisplayName}
                        </Chip>
                        <span style={timeStyle}>{moment(message.Time).fromNow()}</span>
                    </div>
                    <p>{message.Text}</p>
                </ListItem>
            );
            list.push(item);
        });
        return (
            <div style={{height: "100%"}}>
                <Subheader>Sporočila</Subheader>
                <Divider />
                <div style={listStyle} id="messageList">
                    <List>{list}</List>
                </div>
            </div>
        );
    }
}

MessageList.defaultProps = {
    users: {},
    messages: [],
    me: null,
};

export default MessageList;