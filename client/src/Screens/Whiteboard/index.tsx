import { Tldraw } from 'tldraw'
import './index.css'

export default function WhiteBoard() {
	return (
        <div className="h-100 w-100 bg-off-white" style={{inset:0,padding:20}}>
			<Tldraw className='h-100'/>
        </div>
	)
}
