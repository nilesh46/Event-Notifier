import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { firestoreConnect, getFirebase, isEmpty } from "react-redux-firebase";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedAbout from "./UserDetailedAbout";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPageSkeleton from "./UserDetailedPageSkeleton";
import UserDetailedPhotos from "./UserDetailedPhotos";
import { connect } from "react-redux";
import { compose } from "redux";
import NotFound from "../../../App/Layout/NotFound";

const style = {
	"@global": {
		html: {
			fontSize: ".8rem",
		},
	},
};

class UserDetailedPage extends Component {
	state = {
		user: null,
		unsubscribe: null,
		isCurrentUser: false,
	};

	componentDidMount = () => {
		const userId = this.props.match.params.id;
		const currentUserId = getFirebase().auth().currentUser.uid;
		const firestore = getFirebase().firestore();

		const unsubscribe = firestore
			.collection("users")
			.doc(userId)
			.onSnapshot((doc) => {
				if (doc.data()) this.setState({ user: { ...doc.data() } });
				else this.setState({ user: undefined });
			});

		let isCurrentUser = false;
		if (userId === currentUserId) isCurrentUser = true;

		this.setState({ unsubscribe, isCurrentUser });
	};

	componentWillUnmount = () => {
		this.state.unsubscribe();
	};

	render() {
		const { user, isCurrentUser } = this.state;
		let isFollowing = false;
		if (!isEmpty(this.props.isFollowing)) isFollowing = true;
		return (
			<>
				{user === null && <UserDetailedPageSkeleton />}
				{user === undefined && <NotFound />}
				{user && (
					<Grid container spacing={3}>
						<Grid item md={7} xs={12}>
							<UserDetailedHeader
								user={user}
								isCurrentUser={isCurrentUser}
								isFollowing={isFollowing}
							/>
							<UserDetailedAbout user={user} />
						</Grid>

						<Grid item md xs={12}>
							<UserDetailedSidebar />
						</Grid>

						<Grid item md={7} xs={12}>
							<UserDetailedPhotos user={user} />
						</Grid>
						<Grid item md={7} xs={12}>
							<UserDetailedEvents user={user} />
						</Grid>
					</Grid>
				)}
			</>
		);
	}
}

const query = ({ auth, userUid, match }) => {
	if (userUid !== null) {
		return [
			{
				collection: "users",
				doc: auth.uid,
				subcollections: [
					{ collection: "following", doc: match.params.id },
				],
				storeAs: "isFollowing",
			},
		];
	}
};

const mapStateToProps = (state, ownProps) => {
	let userUid = null;
	if (ownProps.match.params.id !== state.auth.uid)
		userUid = ownProps.match.params.id;

	return {
		userUid,
		auth: state.firebase.auth,
		isFollowing: state.firestore.ordered.isFollowing,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => query(props)),
	withStyles(style)
)(UserDetailedPage);
