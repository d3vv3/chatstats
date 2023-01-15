use wasm_bindgen::prelude::*;
// use std::collections::HashMap;
// use chrono::DateTime;

// use serde::{Deserialize, Serialize};
// use serde_json::Result;


// #[derive(Serialize, Deserialize)]
// struct Message {
//     date: DateTime,
//     from: String,
//     text: String,
//     _type: String,
//     media_type: String
// }

// struct Chat {
//     messages: [Message],
//     name: String
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

// #[wasm_bindgen]
// pub fn polarize_by_contacts(chat_object: Chat) -> HashMap {
//     let mut messages_by_contacts = HashMap::new();
//     for (contact, &messages) in chat_object.get(&"messages") {
//         println!("Calling {}: {}", contact, call(number)); 
//     }
// }

// if let messages_by_contacts::Value::Array(skins) = json["skins"] {
//     for skin in skins {
//         // ...
//     }
// }

#[test]
fn add_test() {
    assert_eq!(1 + 1, add(1, 1));
}