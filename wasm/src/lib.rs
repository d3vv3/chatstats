use wasm_bindgen::prelude::*;
use std::collections::HashMap;
// use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};


#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone)]
pub struct Message {
    date: i64,
    from: String,
    text: String,
    r#type: String,
    media_type: Option<String>,
    photo: Option<String>
}

#[derive(Serialize, Deserialize)]
struct Chat {
    messages: Option<Vec<Message>>,
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn polarize_by_contacts(val: JsValue) -> Result<JsValue, JsValue> {
    let chat: Chat = serde_wasm_bindgen::from_value(val)?;
    let mut messages_by_contacts = HashMap::new();

    match chat.messages {
        Some(msg_list) => for msg in msg_list {
            if msg.r#type == "message".to_string() {
                let sender = msg.from.clone();
                let contact_msgs = messages_by_contacts.entry(sender).or_insert(Vec::new());
                contact_msgs.push(msg)
            }
        },
        None => println!("Empty chat."),
    }

    Ok(serde_wasm_bindgen::to_value(&messages_by_contacts)?)
}


#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}

#[test]
fn polarize_by_contacts_test() {

    let mut messages = Vec::new();

    let msg1 = Message {
        date: Utc::now(),
        from: "Paco".to_string(),
        text: "hola".to_string(),
        r#type: "message".to_string()
    };

    let msg2 = Message {
        date: Utc::now(),
        from: "Sara".to_string(),
        text: "hola".to_string(),
        r#type: "message".to_string()
    };

    let msg3 = Message {
        date: Utc::now(),
        from: "Luis".to_string(),
        text: "hola".to_string(),
        r#type: "message".to_string()
    };

    let msg4 = Message {
        date: Utc::now(),
        from: "Maria".to_string(),
        text: "hola".to_string(),
        r#type: "message".to_string()
    };

    messages.push(msg1.clone());
    messages.push(msg2.clone());
    messages.push(msg3.clone());
    messages.push(msg4.clone());

    let chat = Chat {messages: messages, name: "chat".to_string()};

    let mut result = HashMap::new();

    result.insert("Paco", vec![msg1]);
    result.insert("Sara", vec![msg2]);
    result.insert("Luis", vec![msg3]);
    result.insert("Maria", vec![msg4]);

    let chat_serialized = serde_json::to_string(&chat).unwrap();
    let result_serialized = serde_json::to_string(&result).unwrap();

    assert_eq!(Ok(JsValue::from(&result_serialized)), polarize_by_contacts(JsValue::from(&chat_serialized)));
}