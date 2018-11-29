//
//  AlarmTableView.swift
//  Labs8-MealHelper
//
//  Created by Simon Elhoej Steinmejer on 28/11/18.
//  Copyright © 2018 De MicheliStefano. All rights reserved.
//

import UIKit

class AlarmTableView: UITableView, UITableViewDelegate, UITableViewDataSource {

    let cellId = "AlarmCell"
    var alarms = [Alarm]() {
        didSet {
            self.reloadData()
        }
    }
    
    override init(frame: CGRect, style: UITableView.Style) {
        super.init(frame: frame, style: style)
        backgroundColor = .clear
        delegate = self
        dataSource = self
        register(AlarmCell.self, forCellReuseIdentifier: cellId)
        separatorStyle = .none
        allowsSelection = false
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return alarms.count
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return alarms.isEmpty ? 200 : 0
    }
    
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        let label = UILabel()
        label.text = "No alarms have been created yet"
        label.textColor = UIColor.init(white: 0.8, alpha: 1)
        label.font = Appearance.appFont(with: 16)
        label.textAlignment = .center
        
        return label
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = dequeueReusableCell(withIdentifier: cellId, for: indexPath) as! AlarmCell
        
        let alarm = alarms[indexPath.row]
        var alarmTime = alarm.time
        alarmTime.insert(":", at: alarmTime.index(alarmTime.startIndex, offsetBy: 2))
        cell.timeLabel.text = alarmTime
        cell.noteLabel.text = alarm.note
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
