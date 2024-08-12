function NoteItem (props){
    return(
        <>
        <div>Ваш запис: {props.note}!</div>
        <button onClick={() => props.onDelete(props.index)}>Удалить</button>
        </>
    )
}

export default NoteItem;