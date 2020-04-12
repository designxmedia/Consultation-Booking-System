import React, { useState, useRef } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Confirm from '../../UI/confirm/Confirm';
import { ONLINE_BOOKING_URL } from '../../routes/URLMap';
import { fetchUserId } from '../../utils/authentication';
import './onlineBooking.scss';

const OnlineBooking = () => {
    const userId = fetchUserId();
    const [modalShow, setModalShow] = React.useState(false);
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [type, setType] = useState('Online');
    const [campus, setCampus] = useState('Hobart');
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const config = {
        readonly: false,
    };

    const subjectChangeHandler = (event) => {
        setSubject(event.target.value);
    };

    const topicChangeHandler = (event) => {
        setTopic(event.target.value);
    };
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className='online-booking'>
            <Confirm
                show={modalShow}
                type={type}
                campus={campus}
                userId={userId}
                topic={topic}
                subject={subject}
                content={content}
                onHide={() => setModalShow(false)}
            />
            <div className='online-booking__title'>
                <h3>Online Consultation</h3>
            </div>
            <Form>
                <Form.Group as={Row} controlId='formHorizontalTopic'>
                    <Form.Label column='lg' lg={2}>
                        Topic
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            as='select'
                            id='topic'
                            onChange={topicChangeHandler}
                        >
                            <option value='Finance'>Finance</option>
                            <option value='Accommodation'>Accommodation</option>
                            <option value='Course'>Course</option>
                            <option value='Others'>Others</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalTopic'>
                    <Form.Label column='lg' lg={2}>
                        Subject
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            type='text'
                            placeholder='Subject'
                            value={subject}
                            onChange={subjectChangeHandler}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalContent'>
                    <Form.Label column='lg' lg={2}>
                        Content
                    </Form.Label>
                    <Col lg={10}>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalAttachment'>
                    <Form.Label column='lg' lg={2}>
                        Attachment
                    </Form.Label>
                    <Col lg={10}>
                        <Dragger {...props}>
                            <p className='ant-upload-drag-icon'>
                                <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>
                                Click or drag file to this area to upload
                            </p>
                            <p className='ant-upload-hint'>
                                Support for a single or bulk upload. Strictly
                                prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col lg={{ span: 10, offset: 2 }}>
                        <Button
                            variant='primary'
                            onClick={() => setModalShow(true)}
                        >
                            Submit
                        </Button>
                        <Button
                            variant='outline-secondary'
                            type='reset'
                            href={ONLINE_BOOKING_URL}
                        >
                            Reset
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default OnlineBooking;
