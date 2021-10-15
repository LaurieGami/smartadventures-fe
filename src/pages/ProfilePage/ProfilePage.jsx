import "./ProfilePage.scss";
import { Component } from "react";
import axios from 'axios';

class ProfilePage extends Component {
    state = {
        isLoading: true,
        userInfo: {}
    }

    logOut = () => {
        sessionStorage.removeItem('authToken');
        this.props.setAuthToken('');
        this.props.history.push(`/`);
    }

    getUserInfo = (authToken) => {
        axios.get(`/profile`, {
            headers: {
                authorization: `Bearer ${authToken}`
            }
        }).then(res => {
            this.setState({
                isLoading: false,
                userInfo: res.data
            });
        }).catch(() => this.logOut());
    }

    componentDidMount() {
        this.getUserInfo(this.props.authToken);
    }

    render() {
        const { isLoading, userInfo } = this.state;

        return (
            <>
            <main className="profile-page">

                <section className="profile-page__header">
                    <h1 className="profile-page__title">My Profile</h1>
                    <button onClick={() => this.logOut()} className="profile-page__btn">Logout</button>
                </section>

                {/* Profile Info Component */}
                <article className="profile-info-container">
                    {isLoading &&
                        <h2>Loading...</h2>
                    }
                    {!isLoading && 
                        <article className="profile-info">
                            <section className="profile-info__header">
                                <h2 className="profile-info__name">{userInfo.firstName} {userInfo.lastName}</h2>
                            </section>
                            <p className="profile-info__email">{userInfo.email}</p>
                            <p className="profile-info__phone">{userInfo.phone}</p>
                        </article>
                    }
                </article>
            </main>
            </>
        )
    }
}

export default ProfilePage;