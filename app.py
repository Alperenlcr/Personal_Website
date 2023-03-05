from flask import Flask, render_template

app = Flask(__name__)



@app.route("/", methods=["GET", "POST"])
def entry():
    return render_template("index.html")

# My journey
# Projects
# Contact
# CV
# Accomplishments

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
