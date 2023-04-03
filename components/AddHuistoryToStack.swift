func addHistoryLabelsToStackView() {
        guard nextLabelIndex < inputHistoryArray.count else {
               // If we've already added all the labels, we can stop adding new ones
               return
           }
           
        // Get the label at the next index
        let historyLabel = UILabel(frame: CGRect(x: 30, y: 30, width: 10, height: 2))
        historyLabel.text = "\(nextLabelIndex):   \(inputHistoryArray[nextLabelIndex].userInput)         RIGHT loc:\(inputHistoryArray[nextLabelIndex].numAndLocation) ,    ONLY num:\(inputHistoryArray[nextLabelIndex].onlyNum)"
        
        
        
        // Create a new stack view with the label as its only arranged subview
           let newStackView = UIStackView(arrangedSubviews: [historyLabel])
        
           
           
           // Add the new stack view to the existing stack view
        
           
           // Update the index variable for the next time this function is called
           nextLabelIndex += 1
        
    }