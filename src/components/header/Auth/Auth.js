import React from 'react'
import styles from './Auth.module.css'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)

const formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    })
    return valid
}

class Auth extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        formErrors: {
            username: "",
            email: "",
            password: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (formValid(this.state.formErrors)) {
            console.log(`
          --SUBMITTING--
           USERNAME: ${this.state.username}
           EMAIL: ${this.state.email}
           PASSWORD: ${this.state.password}
          `)
        } else {
            console.error("FORM INVALID")
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        let formErrors = this.state.formErrors

        switch (name) {
            case 'username':
                formErrors.username =
                    value.length < 3 && value.length > 0
                        ? 'minimum 3 characaters required'
                        : ''
                break
            case 'email':
                formErrors.email =
                    emailRegex.test(value) && value.length > 0
                        ? ''
                        : 'invalid email address'
                break
            case 'password':
                formErrors.password =
                    value.length < 6 && value.length > 0
                        ? 'minimum 6 characaters required'
                        : ''
                break
            default:
                break
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state))
    }


    render() {
        const { formErrors } = this.state
        let auth = (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <form onSubmit={this.handleSubmit}>
                        <span
                            onClick={this.props.onClose}
                            className={styles.close}
                            title="Close Modal">&times;</span>

                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>
                        <div className={styles.formGroup}>
                            <>
                                <label className={styles.controlLabel}><b>Username</b></label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    name="username"
                                    className={styles.formControl}
                                    onChange={this.handleChange}
                                />

                                {formErrors.username.length > 0 && (
                                    <span className={styles.errorMessage}>{formErrors.username}</span>
                                )}
                            </>

                            <label htmlFor="email"><b>Email</b></label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                className={styles.formControl}
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className={styles.errorMessage}>{formErrors.email}</span>
                            )}

                            <label htmlFor="psw"><b>Password</b></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password" required
                                className={styles.formControl}
                                onChange={this.handleChange}
                            ></input>
                            {formErrors.password.length > 0 && (
                                <span className={styles.errorMessage}>{formErrors.password}</span>
                            )}


                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                name="password"
                                required
                                className={styles.formControl}
                                onChange={this.handleChange}
                            ></input>
                            {formErrors.password.length > 0 && (
                                <span className={styles.errorMessage}>{formErrors.password}</span>
                            )}


                            <div class={styles.clearfix}>
                                <button
                                    type="button"
                                    className={styles.cancelbtn}
                                    onClick={this.props.onClose}
                                >Cancel</button>

                                <button
                                    type="submit"
                                    class={styles.signupbtn}
                                >Sign Up</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );

        if (!this.props.isOpen) {
            auth = null
        }

        return (
            <>
                {auth}
            </>
        )
    }
}

export default Auth 