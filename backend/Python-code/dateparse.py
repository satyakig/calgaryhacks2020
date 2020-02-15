import pandas as pd
import re
import datetime

weightCalendar = [0] * 17


def parseCSV():
    courses = pd.read_csv("CourseList - Sheet1.csv")

    for i in courses["(Delivarable, Date, Diffuculty (in hours), Weight)"]:
        due_dates = re.findall("\((.+?%)\)", i)
        for arr in due_dates:
            name, date, hours, weights = map(lambda x: x.strip(), arr.split(","))
            year, month, day = map(lambda x: int(x), date.split("-"))
            # Return values
            date_week = datetime.datetime(year, month, day).isocalendar()[1]
            weight = int(re.findall("\d+", weights)[0])
            addToCalendar(date_week, weight)

# weekNumber in integer, percentWeight as a descrete integer
# void
def addToCalendar(weekNumber, percentWeight):
    # week already exists in the calendar so we must add it to existing
    weightCalendar[weekNumber - 1] += percentWeight


def weightOfWeek(weekNumber):
    return weightCalendar[weekNumber]


# 0 is green
# 1 is yellow
# 2 is orange
# 3 is red
def getStatusOfWeek(weekNumber):
    weekPercentage = weightCalendar[weekNumber]
    
    if(weekPercentage > 50):
        return 3
    elif(weekPercentage >= 20):
        return 2
    elif(weekPercentage > 0):
        return 1
    else:
        return 0


parseCSV()
print(weightCalendar)


print(sum(weightCalendar))