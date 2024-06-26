import React from 'react';
import Terminal from 'terminal-in-react';
import { auth } from '../../firebase'

const TerminalApp = () => {

    const aboutDeveloper = () =>  { 
        return `
        𝓒𝓻𝓮𝓪𝓽𝓮𝓭 𝓑𝔂 :-

        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░   ░░░░░░░   ░░░░░░░  ░░░░░░░░      ░░░░░   ░░░░   ░░░░░░░  ░░░░░░░░   ░░░░░░░░░   
        ▒  ▒   ▒▒▒    ▒▒▒▒▒▒  ▒  ▒▒▒▒▒▒   ▒▒▒   ▒▒   ▒▒▒▒   ▒▒▒▒▒▒  ▒  ▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒   ▒
        ▒   ▒   ▒ ▒   ▒▒▒▒▒  ▒▒   ▒▒▒▒▒   ▒▒▒▒   ▒   ▒▒▒▒   ▒▒▒▒▒  ▒▒   ▒▒▒▒▒▒▒   ▒▒▒▒▒   ▒▒
        ▓   ▓▓   ▓▓   ▓▓▓▓   ▓▓▓   ▓▓▓▓   ▓▓▓▓   ▓          ▓▓▓▓   ▓▓▓   ▓▓▓▓▓▓▓   ▓▓▓   ▓▓▓
        ▓   ▓▓▓  ▓▓   ▓▓▓       ▓   ▓▓▓   ▓▓▓▓   ▓   ▓▓▓▓   ▓▓▓       ▓   ▓▓▓▓▓▓▓   ▓   ▓▓▓▓
        ▓   ▓▓▓▓▓▓▓   ▓▓   ▓▓▓▓▓▓▓   ▓▓   ▓▓▓   ▓▓   ▓▓▓▓   ▓▓   ▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓     ▓▓▓▓▓
        █   ███████   █   █████████   █      █████   ████   █   █████████   ███████   ██████
        ████████████████████████████████████████████████████████████████████████████████████
        

        𝗚𝗜𝗧𝗛𝗨𝗕 -> https://github.com/Madhav160804

        𝗟𝗜𝗡𝗞𝗘𝗗𝗜𝗡 -> https://www.linkedin.com/in/m-dhingra/

        𝗘𝗠𝗔𝗜𝗟 -> madhavdhingra11@gmail.com
        `
    }

    const descriptions = {
        about: 'About the developer'
    }

    return (
        <div className="terminal-window">
            <Terminal 
                color="green"
                backgroundColor="black"
                hideTopBar={true}
                style={{maxWidth: "100%", minHeight: "100%",height: "100%", lineHeight: "0.7em", fontSize: "1em"}}
                msg={`Welcome ${auth.currentUser?.displayName}, you can use some commands here!`}
                // msg={`Welcome ${getUserAccessName()}, you can use some commands here!`}
                startState='maximised'
                description={descriptions}

                commands={{
                    // 'open-new-tab': () => window.open('https://www.google.com/', '_blank'),
                    'about': aboutDeveloper
                }}
            />
        </div>
    );
}

export default TerminalApp
