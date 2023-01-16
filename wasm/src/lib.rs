use wasm_bindgen::prelude::*;
use std::collections::HashMap;
// use chrono::DateTime;

use serde::{Deserialize, Serialize};
// use serde_json::Result;


#[derive(Serialize, Deserialize, Clone)]
struct Message {
    // date: DateTime,
    from: String,
    text: String,
    _type: String,
    // media_type: String
}

#[derive(Serialize, Deserialize)]
struct Chat {
    messages: Vec<Message>,
    name: String
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn polarize_by_contacts(val: JsValue) -> Result<JsValue, JsValue> {
    // let chat: Chat = val.into_serde().unwrap();
    let chat: Chat = serde_wasm_bindgen::from_value(val)?;
    let mut messages_by_contacts = HashMap::new();

    for msg in chat.messages {
        if msg._type == "message".to_string() {
            let sender = msg.from.clone();
            // if messages_by_contacts.contains_key(&sender) {
            let contact_msgs = messages_by_contacts.entry(sender).or_insert(Vec::new());
            contact_msgs.push(msg)
            // }
            // else {
            //     let mut contact_msgs: Vec<Message> = Vec::new();
            //     messages_by_contacts.insert(&sender, contact_msgs);
            // }
        }
    }

    // JsValue::from_serde(&messages_by_contacts).unwrap()
    Ok(serde_wasm_bindgen::to_value(&messages_by_contacts)?)

//     for (contact, &messages) in chat_object.get(&"messages") {
//         println!("Calling {}: {}", contact, call(number)); 
//     }
}

// if let messages_by_contacts::Value::Array(skins) = json["skins"] {
//     for skin in skins {
//         // ...
//     }
// }

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}

#[test]
fn polarize_by_contacts_test() {

    let mut messages = Vec::new();

    let msg1 = Message {
        from: "Paco".to_string(),
        text: "hola".to_string(),
        _type: "message".to_string()
    };

    let msg2 = Message {
        from: "Sara".to_string(),
        text: "hola".to_string(),
        _type: "message".to_string()
    };

    let msg3 = Message {
        from: "Luis".to_string(),
        text: "hola".to_string(),
        _type: "message".to_string()
    };

    let msg4 = Message {
        from: "Maria".to_string(),
        text: "hola".to_string(),
        _type: "message".to_string()
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