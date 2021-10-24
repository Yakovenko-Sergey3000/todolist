import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllTasks from "../../pages/allTasks";
import NewTask from "../../pages/newTask"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import ResposibleUser from "../../pages/resposibleUser";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const {user} = useContext(AuthContext)
    console.log(user)


    const showPage = (v) => {
        const pages = [<AllTasks/>, <ResposibleUser/>, <NewTask/>]
        return pages[v]
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



const tabs = () => {
    const tabsArr = [
        <Tab label="Мои задачи" {...a11yProps(0)} />,
        <Tab label="Ответственные" {...a11yProps(1)} />,
        <Tab label="Новая задача" {...a11yProps(2)} />,
        ]

    if(user) {
        if(user.position === 'admin') {
            let i = 0
            return tabsArr.map(t => {
                return {...t, key: i++}
            })
        }


        return tabsArr[0]
    }
    return null





}

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', maxHeight: '100vh' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px'}}
            >
                {tabs()}
            </Tabs>
            {/*<TabPanel value={value} index={0}>*/}
            {/*    Активные задачи*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={1}>*/}
            {/*    */}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={2}>*/}
            {/*    Отвественные*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={3}>*/}
            {/*    Все пользователи*/}
            {/*</TabPanel>*/}
            {showPage(value)}

        </Box>
    );
}
