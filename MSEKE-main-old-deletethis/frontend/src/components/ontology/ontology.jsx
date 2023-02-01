import React from 'react';
import "../../css/ontology.css";
import CreateTree from './tree.jsx';
import { SizeMe } from 'react-sizeme';

const thedata1 = {
    name: 'A', 
    colour: 'red', 
    shape: 'set', 
    parent: [], 
    children: [
        {name: 'B', colour: 'red', shape: 'set', parent: 'A', children: []}, 
        {name: 'C', colour: 'red', shape: 'set', parent: 'A', children: []}, 
        {name: 'D', colour: 'red', shape: 'set', parent: 'A', children: [
            {name: 'E', colour: 'red', shape: 'set', parent: 'D', children: []}
        ]}
    ]
};

export default class Ontology extends React.Component { 
    constructor() {
        super();
    }

    render () {  
        
        return (
            <div className='background'>
                <div className='content-side'>
                    <div className='intro'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat ipsum nec orci mattis, at auctor turpis congue. Maecenas vel elementum velit. Duis sed dui ac augue condimentum aliquet. Cras vestibulum venenatis feugiat. Donec et justo at orci viverra vulputate in ac mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla volutpat augue sed est eleifend, sit amet ultrices nibh egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ante mauris, tempor in varius sed, efficitur at velit.
                    </div>
                    <div className='relation-section' id='first-relation'>
                        <h1 style={{color: "#292929"}}>Subset</h1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat ipsum nec orci mattis, at auctor turpis congue. Maecenas vel elementum velit. Duis sed dui ac augue condimentum aliquet. Cras vestibulum venenatis feugiat. Donec et justo at orci viverra vulputate in ac mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla volutpat augue sed est eleifend, sit amet ultrices nibh egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ante mauris, tempor in varius sed, efficitur at velit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat ipsum nec orci mattis, at auctor turpis congue. Maecenas vel elementum velit. Duis sed dui ac augue condimentum aliquet. Cras vestibulum venenatis feugiat. Donec et justo at orci viverra vulputate in ac mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla volutpat augue sed est eleifend, sit amet ultrices nibh egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ante mauris, tempor in varius sed, efficitur at velit.
                        </div>
                    <div className='relation-section'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat ipsum nec orci mattis, at auctor turpis congue. Maecenas vel elementum velit. Duis sed dui ac augue condimentum aliquet. Cras vestibulum venenatis feugiat. Donec et justo at orci viverra vulputate in ac mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla volutpat augue sed est eleifend, sit amet ultrices nibh egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ante mauris, tempor in varius sed, efficitur at velit.
                    </div>
                    <div className='relation-section'>
                        Section 2
                    </div>
                </div>

                <div className='example-side'>
                <SizeMe>
                {({ size }) => 
                    <div>
                        <CreateTree data={thedata1} width={size.width} height={'400'}/>
                        <CreateTree data={thedata1} width={size.width} height={'400'}/>
                        <CreateTree data={thedata1} width={size.width} height={'400'}/>
                    </div>
                }
                </SizeMe>
                </div>
            </div>
        );
    }
}