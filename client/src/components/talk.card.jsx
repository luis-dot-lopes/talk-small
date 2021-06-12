
export default (props) => {

    return (
        <div onClick={(function () { this.setState({ current_talk: props.name }) })
        .bind(props.component)} className="talk">
            <h3>{props.name}</h3>
            <h4>{props.lastMessage}</h4>
        </div>
    );

};
