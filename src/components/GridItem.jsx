function GridItem(props) {
    return <div id={`${props.children}`} className="bg-gray-200 h-24 w-24 flex items-center justify-center text-lg">{props.children}</div>
}

export default GridItem