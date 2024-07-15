import GenericNavBar from "@/components/GenericNavBar/GenericNavBar";
import { ResponsivePageLayout } from "@/components/ResponsivePage";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import MapWrapper  from "@/components/map/MapWrapper";


const pages = [
    { name: "Projects", link: "/public-involvement/pi-tool/projects" },
    { name: "Contacts", link: "/public-involvement/pi-tool/contacts" },
  ];
  
  const settings = [
    { name: "Profile", link: "/profile" },
    { name: "Account", link: "/account" },
    { name: "Logout", link: "/logout" },
  ];

  const interactions = [
    { type: 'Phone Call', contact: "Bobby" },
    { type: 'Inpersion meeting', contact: "Jill" },]


const Project = () =>{
return (
    <>
          <GenericNavBar pages={pages} settings={settings} />

          <ResponsivePageLayout title={""}>
   <Box sx={{display:'flex', flexDirection:'column', gap:3, height:'1000px'}}>
    <Box sx={{display:'flex', justifyContent:'space-between',width: '100%', alignItems: 'center'}}>
        <Button variant="contained">
          Project Contacts
        </Button>
        <Typography variant="h2" sx={{marginLeft:'95px'}}>
            Project Interactions
        </Typography>
        <Autocomplete
        sx={{minWidth:'250px'}}
        id="search-interactions"
        options={interactions.map((option) => option.type)}
        renderInput={(params) => <TextField {...params} label="search Interactions" />}
      />
    </Box>
 <Box sx={{ flex: 2, }}>
        <MapWrapper  zoom={10}  />
      </Box>
    </Box>

    </ResponsivePageLayout>
    </>
)
}

export default Project;
