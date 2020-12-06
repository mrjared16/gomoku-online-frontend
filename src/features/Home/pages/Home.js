import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import ListUserStatus from "features/Home/components/ListUserStatus";
import { range } from "lodash";

const useStyles = makeStyles({
	root: {
		height: "calc(100vh - 48px)",
		"& .MuiGrid-container": {
			height: "100%",
			"& .MuiGrid-item": {
				maxHeight: "100%",
				overflow: "auto",
				"&::-webkit-scrollbar": {
					width: "0.3em",
				},
				"&::-webkit-scrollbar-track": {
					boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
					webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#d4a531",
				},
			}
		}
	}
})

const list = range(0, 50, 1).map((index) => {
	if (index % 2 === 0) {
		return {
			fullName: "Phuc" + index,
			photo: "",
			online: true,
		}
	} else {
		return {
			online: false,
			fullName: "Tuan" + index,
			photo: "",
			time: "2m",
		}	
	}
});

function Home() {
	const classes = useStyles();

  return (
    <div className={classes.root}>
			<Grid container>
				<Grid item xs={10}></Grid>
				<Grid item xs={2}>
					<ListUserStatus list={list} />
				</Grid>
			</Grid>
		</div>
  );
}

export default Home;
