import os
import cv2
import numpy as np
import sys

def detect_people(file_path: str):
    # YOLO model
    net = cv2.dnn.readNet("algorithm_URVRV/yolov3.weights", "algorithm_URVRV/yolov3.cfg")

    image = cv2.imread(file_path)

    if image is None:
        print(f"Error: Unable to read the image at {file_path}")
        return

    (height, width) = image.shape[:2]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)

    output_layer_name = net.getUnconnectedOutLayersNames()
    output_layers = net.forward(output_layer_name)

    people = []
    confidences = []

    for output in output_layers:
        for detection in output:
            # Extract the class ID and confidence of the current detection
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            # Keep detections with a high confidence
            if class_id == 0 and confidence > 0.5:
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                people.append((x, y, w, h))
                confidences.append(confidence)

    indices = cv2.dnn.NMSBoxes(people, confidences, score_threshold=0.5, nms_threshold=0.4)
    # Write the number of people to a fixed text file
    num_people = len(indices)
    output_txt_path = "numberPeople.txt"
    with open(output_txt_path, 'w') as txt_file:
        txt_file.write(f"{num_people}")

    # Draw bounding boxes
    for i in indices:
        x, y, w, h = people[i]
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

        label = 'Person'
        cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    # Print the number of people detected
    num_people = len(indices)
    #print(f"Number of people in {file_path}: {num_people}")

    # Save the annotated image
    output_file_path = f"annotated_images/{os.path.basename(file_path)}"
    cv2.imwrite(output_file_path, image)
    #print(f"Annotated image saved at {output_file_path}")
    #print(f"People count information saved at {output_txt_path}")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python your_script.py path/to/your/image.jpg || check server/app.js -> pythonProcess")
        sys.exit(1)

    file_path = sys.argv[1]
    #print(file_path)
    detect_people(file_path)
