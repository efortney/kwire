import React from 'react';
import { Typography, Button } from '@material-ui/core';

/**
 * PageHeader is responsible for showing the term, category, or filter that is being 
 * used while browsing the main questions page.
 */
const PageHeader = (props) => {

  const styles = {
    marginTop: '1em',
    marginBottom: '1em',
  }

  const headerText = props.query !== 'Most Recent Questions' ? 'Search Results' : 'Most Recent Questions'

  return (
    <div style={styles} className="text-left">
      <div className="row">
        <div className="col-10 text-left">
          <Typography variant="h4">{headerText}</Typography>
        </div>
        <div className="col-1">
          <Button color="primary" size="small" variant="contained">Ask Question</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Typography variant="body2">{props.totalQuestions} results for {props.query}</Typography>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default PageHeader;