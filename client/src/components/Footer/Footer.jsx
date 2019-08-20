import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";

const Footer = () => {
    return (
        <div className="footer">
          <div>
            <List>
              <ListItem>
                <div>
                  &copy; {1900 + new Date().getYear()} , GreenToad
                </div>
                <IconButton justicon="true" color="primary">
                  <a
                    href="https://github.com/projectGreenbelt/projectGreenbelt"
                    className="iconButton"
                  >
                    <i
                      className="fab fa-github-square"
                      id="icon"
                      aria-hidden="true"
                      color="secondary"
                    />
                  </a>
                </IconButton>
              </ListItem>
            </List>
          </div>
        </div>
    )
}

export default Footer;