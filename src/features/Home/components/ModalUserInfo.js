import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React, { useState } from 'react';
import RankCustom from 'components/RankCustom';
import { getRankSymbol } from 'utils/rank';
import TypographyCustom from 'components/TypographyCustom';
import Loading from 'components/Loading';
import moment from 'moment';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 300,
		},
	},
	container: {
		height: '100%',
		'& h6': {
			fontWeight: 'normal',
			marginRight: 10,
		},
		'& .MuiIcon-root': {
			width: 'fit-content',
		},
	},
	name: {
		marginTop: 10,
		'& h6': {
			margin: 0,
		},
	},
	containerRank: {
		display: 'flex',
		alignItems: 'center',
		marginRight: 5,
	},
	edit: {
		marginBottom: 5,
		width: '100%',
		'& .MuiIcon-root': {
			width: 'fit-content',
			fontSize: 18,
		},
	},
	inputName: {
		width: 100,
		marginTop: 5,
		'& .MuiInputBase-root': {
			fontSize: '0.875rem',
		},
	},
	username: {
		wordBreak: 'break-all',
	},
});

const validationProfileSchema = Yup.object().shape({
	name: Yup.string().trim().required('Required'),
});

function ModalUserInfo({
	open = false,
	toggle = () => { },
	userInfo = null,
	loading = true,
}) {
	const classes = useStyles();
	const [editing, setEditing] = useState(false);
	const { currentUserInfo } = useSelector((state) => state.user);
	const isProfile = currentUserInfo && currentUserInfo.id === userInfo?.id;

	const handleUpdateProfile = (values) => {
		console.log(
			'🚀 ~ file: ModalUserInfo.js ~ line 64 ~ handleUpdateProfile ~ values',
			values
		);
		setEditing(false);
	};

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			{loading && !userInfo ? (
				<Loading />
			) : (
					<Formik
						initialValues={{
							name: userInfo?.name || '',
						}}
						validationSchema={validationProfileSchema}
						onSubmit={handleUpdateProfile}
					>
						{({
							values,
							handleSubmit,
							handleChange,
							handleBlur,
							errors,
							touched,
						}) => (
							<Form>
								<>
									<DialogContent>
										<Box
											display="flex"
											flexDirection="column"
											alignItems="center"
											className={classes.container}
										>
											<Box
												display="flex"
												flexDirection="column"
												alignItems="center"
											>
												<AvatarCustom photo={userInfo?.photo} size="extraLarge" />
												{!editing && (
													<TypographyCustom
														className={classes.name}
														text={values.name || ''}
													/>
												)}
												{isProfile && editing && (
													<TextField
														className={classes.inputName}
														name="name"
														value={values.name}
														onChange={handleChange}
														onBlur={handleBlur}
														error={Boolean(errors.name) && touched.name}
														helperText={touched.name && errors.name}
														size="small"
													/>
												)}
											</Box>

											<Box
												display="flex"
												flexDirection="column"
												width="100%"
												marginTop={2}
											>
												<Box display="flex">
													<Typography variant="subtitle2">Username:</Typography>
													<Typography
														className={classes.username}
														variant="subtitle2"
													>
														{userInfo?.username}
													</Typography>
												</Box>
												<Box display="flex" alignItems="center" marginTop={1}>
													<Typography variant="subtitle2">Rank:</Typography>
													<div className={classes.containerRank}>
														<RankCustom symbol={getRankSymbol(userInfo?.rank)} />
													</div>
													<span>{userInfo?.rank}</span>
												</Box>
												<Box display="flex" marginTop={1}>
													<Typography variant="subtitle2">Win Rate:</Typography>
													<TypographyCustom
														text={
															userInfo?.winRate == null
																? ''
																: userInfo?.winRate + '%'
														}
														variant="subtitle2"
													/>
												</Box>
												<Box display="flex" marginTop={1}>
													<Typography variant="subtitle2">
														Number of win games:
                        </Typography>
													<TypographyCustom
														text={userInfo?.numberOfWonMatches}
														variant="subtitle2"
													/>
												</Box>
												<Box display="flex" marginTop={1}>
													<Typography variant="subtitle2">
														Number of games:
                        </Typography>
													<TypographyCustom
														text={userInfo?.numberOfMatches}
														variant="subtitle2"
													/>
												</Box>
												<Box display="flex" marginTop={1}>
													<Typography variant="subtitle2">Join date:</Typography>
													<TypographyCustom
														text={moment(userInfo?.joinDate).format('DD/MM/YYYY')}
														variant="subtitle2"
													/>
												</Box>
											</Box>
										</Box>
									</DialogContent>
									<DialogActions>
										{isProfile && !editing && (
											<>
												<Button
													variant="contained"
													color="primary"
													onClick={() => setEditing(true)}
													size="small"
												>
													Edit
                      </Button>
											</>
										)}

										{isProfile && editing && (
											<>
												<Button
													variant="contained"
													style={{ backgroundColor: '#939b62' }}
													onClick={handleSubmit}
													size="small"
												>
													Save changes
											</Button>

												<Button
													variant="contained"
													color="secondary"
													onClick={() => setEditing(!editing)}
													size="small"
												>
													Cancel
                      </Button>
											</>
										)}

										{!editing && <Button
											variant="contained"
											color="secondary"
											onClick={toggle}
											size="small"
										>
											Close
                      </Button>}
									</DialogActions>
								</>
							</Form>
						)}
					</Formik>
				)}
		</Dialog>
	);
}

export default ModalUserInfo;
