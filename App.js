import React, { Component } from "react";
import Modal from './components/Modal';
import Event from './components/Event';
import Notification from './components/Notification';
import WeatherForecast from './components/WeatherForecast'
import { MDBBtn,  MDBContainer, MDBRow, MDBCol } from "mdbreact";

class App extends Component {
    state = {
        notification: "",
        modal: false,
        events: [
            {
                id: 1,
                time: "10:00",
                title: "Breakfast with Simon",
                location: "Lounge Caffe",
                description: "Discuss Q3 targets"
            },
            {
                id: 2,
                time: "10:30",
                title: "Daily Standup Meeting (recurring)",
                location: "Warsaw Spire Office"
            },
            { id: 3, time: "11:00", title: "Call with HRs" },
            {
                id: 4,
                time: "12:00",
                title: "Lunch with Timmoty",
                location: "Canteen",
                description:
                    "Project evalutation ile declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a"
            }
        ]
    }

    componentDidMount() {
        window.addEventListener('online', () => {
            this.setState({ notification: 'online' });
        });

        window.addEventListener('offline', () => {
            this.setState({ notification: 'offline' });
        });
    }


    addEvent = () => {
        var newArray = [...this.state.events];
        newArray.push({
            id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
            time: this.state.time,
            title: this.state.title,
            location: this.state.location,
            description: this.state.description,
            value: this.var > 5 ? "Its's grater then 5" : "Its lower or equal 5"
        });

        this.setState({
                events: newArray,
                time: "",
                title: "",
                location: "",
                description: ""
            }
        );
    };

    handleInputChange = inputName => value => {
        const nextValue = value;

        this.setState({
            [inputName]: nextValue
        });
    };

    handleDelete = eventId => () => {
        const events = this.state.events.filter(e => e.id !== eventId);
        this.setState({ events });
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        const { events, modal, notification } = this.state;

        return (
            <>
                <MDBContainer>
                    <Notification notification={notification} />
                    <MDBRow>
                        <MDBCol md="9" className="mb-r">
                            <h2 className="text-uppercase my-3">Today:</h2>
                            <div id="schedule-items">
                                {events.map(event => (
                                    <Event
                                        key={event.id}
                                        id={event.id}
                                        time={event.time}
                                        title={event.title}
                                        location={event.location}
                                        description={event.description}
                                        onDelete={this.handleDelete}
                                    />
                                ))}
                            </div>
                            <MDBRow className="mb-4">
                                <MDBCol xl="3" md="6" className="mx-auto text-center">
                                    <MDBBtn color="info" rounded onClick={this.toggleModal}>
                                        Add Event
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <WeatherForecast length={events.length} />
                    </MDBRow>
                </MDBContainer>
                <Modal isOpen={modal} toggleModal={this.toggleModal} handleInputChange={this.handleInputChange} addEvent={this.addEvent} />
            </>
        );
    }
}

export default App;