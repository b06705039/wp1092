import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage, clearMessages } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType1, setQueryType1] = useState('name');
  const [queryCompare1, setQueryCompare1] = useState('=');
  const [queryString1, setQueryString1] = useState('');

  const [queryAndOr, setQueryAndOr] = useState('or');

  const [queryType2, setQueryType2] = useState('name');
  const [queryCompare2, setQueryCompare2] = useState('=');
  const [queryString2, setQueryString2] = useState('');

  const [querySortBy, setQuerySortBy] = useState('default');

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  const handleQuery1 = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/cards', { params: { queryType: queryType1,  queryString: queryString1,  queryCompare: queryCompare1, querySortBy: querySortBy} })

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };

  const handleQuery2 = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/cards', { params: { queryType: queryType2,  queryString: queryString2,  queryCompare: queryCompare2, querySortBy: querySortBy} })

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };

  const handle2Queries = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/cards-advanced', { 
      params: { 
        queryType1: queryType1,
        queryString1: queryString1,
        queryCompare1: queryCompare1,
        queryType2: queryType2,
        queryString2: queryString2,
        queryCompare2: queryCompare2,
        queryAndOr: queryAndOr, 
        querySortBy: querySortBy} })
    
    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
      <FormControl component="fieldset">
        <FormLabel component="legend">Query Sort By: (When equal will apply default)</FormLabel>
          <RadioGroup
            row
            value={querySortBy}
            onChange={handleChange(setQuerySortBy)}
          >
            <FormControlLabel
              value="default"
              control={<Radio color="primary" />}
              label="Default (added time)"
            />
            <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
            />
            <FormControlLabel
              value="subject"
              control={<Radio color="primary" />}
              label="Subject"
            />
            <FormControlLabel
              value="score"
              control={<Radio color="primary" />}
              label="Score"
            />
          </RadioGroup>
        </FormControl>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType1}
              onChange={handleChange(setQueryType1)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
              <FormControlLabel
                value="score"
                control={<Radio color="primary" />}
                label="Score"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        {queryType1 === "score" ? (
          <FormControl component="fieldset">
            <Select
              value={queryCompare1}
              onChange={handleChange(setQueryCompare1)}
            >
              <MenuItem value={">="}>&ge;</MenuItem>
              <MenuItem value={">"}>&gt;</MenuItem>
              <MenuItem value={"="}>=</MenuItem>
              <MenuItem value={"<"}>&lt;</MenuItem>
              <MenuItem value={"<="}>&le;</MenuItem>
            </Select>
          </FormControl>
          ) : ''}
        <TextField
          placeholder="Query string..."
          value={queryString1}
          onChange={handleChange(setQueryString1)}
          style={{ flex: 1 }}
          type={`${queryType1 === "score" ? "number" : "text"}`}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString1}
          onClick={handleQuery1}
        >
          Query
        </Button>
      </Row>
      <Row>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={queryAndOr}
            onChange={handleChange(setQueryAndOr)}
          >
            <FormControlLabel
              value="and"
              control={<Radio color="primary" />}
              label="AND"
            />
            <FormControlLabel
              value="or"
              control={<Radio color="primary" />}
              label="OR"
            />
          </RadioGroup>
        </FormControl>
        <Button
          // className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString1 || !queryString2}
          onClick={handle2Queries}
        >
          Advanced Query
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType2}
              onChange={handleChange(setQueryType2)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
              <FormControlLabel
                value="score"
                control={<Radio color="primary" />}
                label="Score"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        {queryType2 === "score" ? (
          <FormControl component="fieldset">
            <Select
              value={queryCompare2}
              onChange={handleChange(setQueryCompare2)}
            >
              <MenuItem value={">="}>&ge;</MenuItem>
              <MenuItem value={">"}>&gt;</MenuItem>
              <MenuItem value={"="}>=</MenuItem>
              <MenuItem value={"<"}>&lt;</MenuItem>
              <MenuItem value={"<="}>&le;</MenuItem>
            </Select>
          </FormControl>
          ) : ''}
        <TextField
          placeholder="Query string..."
          value={queryString2}
          onChange={handleChange(setQueryString2)}
          style={{ flex: 1 }}
          type={`${queryType2 === "score" ? "number" : "text"}`}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString2}
          onClick={handleQuery2}
        >
          Query
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <Button
          variant="contained"
          color="primary"
          disabled={!(messages.length)}
          onClick={clearMessages}
        >
          Clear Messages
        </Button>
        <Row>
          Please read my README if you're confused with the features!
        </Row>
    </Wrapper>
  );
};

export default Body;
